require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const User = require("../models/User");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/src/images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "not authorised" });
    }

    const result = await bcrypt.compare(req.body.password, user.hash);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", message: "login failed" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      photo: user.photo,
      role: user.role,
      friends: user.friends,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "1d", // jwt will automatically convert into milliseconds
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d", // jwt will automatically convert into milliseconds
      jwtid: uuidv4(),
    });

    const response = { access, refresh };

    res.json(response);
  } catch (error) {
    console.log("POST /login", error); // on server
    res.status(400).json({ status: "error", message: "login failed" }); // sent to client
  }
});

router.post("/refresh", (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const payload = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      photo: decoded.photo,
      role: decoded.role,
      friends: decoded.friends,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "1d", // jwt will automatically convert into milliseconds
      jwtid: uuidv4(),
    });

    const response = { access };

    res.json(response);
  } catch (error) {
    console.log("POST /refresh", error);
    res.status(401).json({
      status: "error",
      message: "unauthorised",
    });
  }
});

router.put("/register", upload.single("photo"), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ status: "error", message: "duplicate email" });
    }

    function alphanumericCheck(input) {
      const letterNumber = /^[0-9a-zA-Z]+$/;
      if (input.match(letterNumber)) {
        return true;
      } else {
        return false;
      }
    }

    if (!alphanumericCheck(req.body.password)) {
      return res
        .status(400)
        .json({ status: "error", message: "password is not alphanumeric" });
    }

    if (req.body.password.length < 12) {
      return res
        .status(400)
        .json({ status: "error", message: "password length is too short" });
    }

    if (req.body.password !== req.body.password1) {
      return res
        .status(400)
        .json({ status: "error", message: "passwords do not match" });
    }

    const hash = await bcrypt.hash(req.body.password, 12); // 12-25 is how many times you are salting it
    const createdUser = await User.create({
      email: req.body.email,
      hash,
      name: req.body.name,
      photo: req.file?.filename,
      role: req.body.role,
    });

    console.log("created user: ", createdUser);
    res.json({ status: "ok", message: "user created" });
  } catch (error) {
    console.log("PUT /register", error);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
});

router.get("/users", auth, async (req, res) => {
  if (req.decoded.role === "admin") {
    const users = await User.find(); // can add .select("email") to filter results
    res.json(users);
  }

  if (req.decoded.role === "user") {
    const user = await User.find({ email: req.decoded.email });
    res.json(user);
  }
});

router.get("/allusers", async (req, res) => {
  const users = await User.find(); // can add .select("email") to filter results
  res.json(users);
});

router.get("/finduser", async (req, res) => {
  const user = await User.find({ _id: req.query.userId }); // can add .select("email") to filter results
  res.json(user);
});

router.post("/user", auth, async (req, res) => {
  if (req.decoded.role === "admin") {
    const user = await User.findOne({ email: req.body.email });
    res.json(user);
  }
});

router.patch("/user", auth, async (req, res) => {
  if (req.decoded.role === "admin") {
    const currentUserData = await User.findOne({ email: req.body.email });
    const newUserData = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          email: req.body.newEmail || currentUserData.email,
          name: req.body.name || currentUserData.name,
          photo: req.body.photo || currentUserData.photo,
          role: req.body.role || currentUserData.role,
          friends: req.body.friends || currentUserData.friends,
        },
      },
      { new: true }
    );

    if (req.body.email === req.decoded.email) {
      if (req.body.newPassword) {
        const hash = await bcrypt.hash(req.body.newPassword, 12); // 12-25 is how many times you are salting it
        const newUserData2 = await User.findOneAndUpdate(
          { email: req.body.email },
          {
            $set: {
              hash: hash || currentUserData.hash,
            },
          },
          { new: true }
        );
        return res.json(newUserData2);
      }
    }
    res.json(newUserData);
  }

  if (req.decoded.role === "user") {
    const currentUserData = await User.findOne({ email: req.decoded.email });
    const newUserData = await User.findOneAndUpdate(
      { email: req.decoded.email },
      {
        $set: {
          email: req.body.newEmail || currentUserData.email,
          name: req.body.name || currentUserData.name,
          photo: req.body.photo || currentUserData.photo,
          friends: req.body.friends || currentUserData.friends,
        },
      },
      { new: true }
    );

    if (req.body.newPassword) {
      const hash = await bcrypt.hash(req.body.newPassword, 12); // 12-25 is how many times you are salting it
      const newUserData2 = await User.findOneAndUpdate(
        { email: req.decoded.email },
        {
          $set: {
            hash: hash || currentUserData.hash,
          },
        },
        { new: true }
      );
      return res.json(newUserData2);
    }
    res.json(newUserData);
  }
});

router.delete("/user", auth, async (req, res) => {
  if (req.decoded.role === "admin") {
    const user = await User.deleteOne({ email: req.body.email });
    res.json(user);
  }

  if (req.decoded.role === "user") {
    const user = await User.deleteOne({ email: req.decoded.email });
    res.json(user);
  }
});

router.post("/friends", auth, async (req, res) => {
  const UserDataFriendsUpdated = await User.findOneAndUpdate(
    { email: req.decoded.email },
    { $push: { friends: req.body.userId } },
    { new: true }
  );
  res.json(UserDataFriendsUpdated);
});

router.delete("/friends/:userId", auth, async (req, res) => {
  const UserDataFriendsUpdated = await User.findOneAndUpdate(
    { email: req.decoded.email },
    { $pull: { friends: req.params.userId } },
    { new: true }
  );
  res.json(UserDataFriendsUpdated);
});

module.exports = router;
