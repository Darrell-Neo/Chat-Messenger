require("dotenv").config();

const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

const selectParams =
  "title image petName species breed sex size age medical isArchive favouritesCount ownerContactName ownerContactEmail ownerContactPhone ownerContactAddress profileContact dateCreated"; // currently set to all params

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

// CREATE LISTING
router.put("/create", upload.single("image"), auth, async (req, res) => {
  try {
    const createdListing = await Listing.create({
      title: req.body.title,
      image: req.file?.filename,
      petName: req.body.petName,
      species: req.body.species,
      breed: req.body.breed,
      sex: req.body.sex,
      size: req.body.size,
      age: req.body.age,
      medical: req.body.medical,
      isArchive: req.body.isArchive,
      favouritesCount: req.body.favouritesCount,
      ownerContactName: req.body.ownerContactName,
      ownerContactEmail: req.body.ownerContactEmail,
      ownerContactPhone: req.body.ownerContactPhone,
      ownerContactAddress: req.body.ownerContactAddress,
      profileContact: {
        // here links with payload from users /login
        id: req.decoded.id,
        name: req.decoded.name,
        email: req.decoded.email,
      },
      comments: req.body.comments,
      dateCreated: req.body.dateCreated,
    });

    console.log("created listing:  ", createdListing);
    res.json({ status: "ok", message: "listing created" });
  } catch (error) {
    console.log("PUT /create", error); // on server
    res.status(400).json({
      status: "error",
      message: "failed: listing could not be created",
    }); // sent to client
  }
});

// DISPLAY ALL LISTINGS
router.get("/displayAll", async (req, res) => {
  try {
    const allListings = await Listing.find().select(selectParams); // this filters what information we want to send to the front-end (sensitive) **
    res.json(allListings);
  } catch (error) {
    console.log(`GET /displayAll ${error}`);
    res
      .status(400)
      .json({ status: "error", message: "failed: cannot display listings" });
  }
});

// DISPLAY 1 LISTING via ID --> back-end
router.post("/listing", async (req, res) => {
  try {
    const searchListing = await Listing.find(
      { _id: req.body.id }.select(selectParams)
    ); // come back to set up more search params
    res.json(searchListing);
  } catch (error) {
    console.log(`POST /listing ${error}`);
    res
      .status(400)
      .json({ status: "error", message: "failed: no such listing found" });
  }
});

/////////////////////////////////////////////////////
// SEARCH BAR : generic search filters --> front end        [[ NOT DONE ]]
/////////////////////////////////////////////////////

// UPDATE LISTING
router.patch("/edit", auth, async (req, res) => {
  // update ANY listing as admin
  if (req.decoded.role === "admin") {
    const anyListingData = await Listing.findOne({ _id: req.body.id });
    const newListingData = await Listing.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title || anyListingData.title, // req.body.newtitle
          image: req.body.image || anyListingData.image,
          petName: req.body.petName || anyListingData.petName,
          species: req.body.species || anyListingData.species,
          breed: req.body.breed || anyListingData.breed,
          sex: req.body.sex || anyListingData.sex,
          size: req.body.size || anyListingData.size,
          age: req.body.age || anyListingData.age,
          medical: req.body.medical || anyListingData.medical,
          isArchive: req.body.isArchive || anyListingData.isArchive,
          favouritesCount:
            req.body.favouritesCount || anyListingData.favouritesCount,
          ownerContactName:
            req.body.ownerContactName || anyListingData.ownerContactName,
          ownerContactEmail:
            req.body.ownerContactEmail || anyListingData.ownerContactEmail,
          ownerContactPhone:
            req.body.ownerContactPhone || anyListingData.ownerContactPhone,
          ownerContactAddress:
            req.body.ownerContactAddress || anyListingData.ownerContactAddress,
          comments: req.body.comments || anyListingData.comments,
        },
      },
      { new: true }
    );
    res.json(newListingData);
  }

  // update own post as user
  if (req.decoded.role === "user") {
    const ownListingData = await Listing.findOne({ _id: req.body.id });
    if (req.decoded.id === ownListingData.profileContact.id) {
      const newListingData = await Listing.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            title: req.body.title || ownListingData.title, // req.body.newtitle
            image: req.body.image || ownListingData.image,
            petName: req.body.petName || ownListingData.petName,
            species: req.body.species || ownListingData.species,
            breed: req.body.breed || ownListingData.breed,
            sex: req.body.sex || ownListingData.sex,
            size: req.body.size || ownListingData.size,
            age: req.body.age || ownListingData.age,
            medical: req.body.medical || ownListingData.medical,
            isArchive: req.body.isArchive || ownListingData.isArchive,
            favouritesCount:
              req.body.favouritesCount || ownListingData.favouritesCount,
            ownerContactName:
              req.body.ownerContactName || ownListingData.ownerContactName,
            ownerContactEmail:
              req.body.ownerContactEmail || ownListingData.ownerContactEmail,
            ownerContactPhone:
              req.body.ownerContactPhone || ownListingData.ownerContactPhone,
            ownerContactAddress:
              req.body.ownerContactAddress ||
              ownListingData.ownerContactAddress,
            comments: req.body.comments || ownListingData.comments,
          },
        },
        { new: true }
      );
      res.json(newListingData);
    }
  }
});

// UPDATE LISTING FAVOURITE COUNT
router.patch("/favourite", async (req, res) => {
  // both admin and users can update listing favourite count
  const newListingData = await Listing.findOneAndUpdate(
    { _id: req.body.id },
    { $inc: { favouritesCount: +1 } },
    { new: true }
  );
  res.json(newListingData);
});

// UPDATE LISTING ARCHIVE STATE
router.patch("/archive", async (req, res) => {
  const newListingArchive = await Listing.findOneAndUpdate(
    { _id: req.body.id },
    { isArchive: req.body.isArchive },
    { new: true }
  );
  res.json(newListingArchive);
});

// DELETE LISTING
router.delete("/delete", auth, async (req, res) => {
  if (req.decoded.role === "admin") {
    const deleteListing = await Listing.deleteOne({ _id: req.body.id });
    res.json(deleteListing);
  }

  if (req.decoded.role === "user") {
    const ownListingData = await Listing.findOne({ _id: req.body.id });
    if (req.decoded.id === ownListingData.profileContact.id) {
      const deleteListing = await Listing.deleteOne({ _id: req.body.id });
      res.json(deleteListing);
    }
  }
});

// SEED DATA
router.get("/seed", async (req, res) => {
  //to make sure that the data you are seeding is the right data, you can remove the rest first
  await Listing.deleteMany();

  await Listing.create(
    {
      title: "Pug Pup for adoption",
      image: "1pug.jpeg",
      petName: "Bread",
      species: "dog",
      breed: "Pug",
      sex: "Male",
      size: "Small",
      age: "2",
      medical: "Respiratory Distress, Eye Injuries.",
      ownerContactName: "Lionel Yong",
      ownerContactEmail: "LiYong@gmail.com",
      ownerContactPhone: "92705674",
      ownerContactAddress: "42 everton road",
      profileContact: {
        id: "716239123h6712638",
        name: "Lionel Yong",
        email: "Liyong@gmail.com",
      },
      comments:
        "I had five procedures to get me healthy: Neuter, skin tuck, soft palate surgery, stenotic nares surgery and a dental cleaning. I have a UTI which is being treated and I will be retested soon to make sure it is all gone. Between the neuter and UTI, I have to wear a belly band at all times. Hopefully, with your love and help, I can learn to potty outside all the time and not wear a belly band. I think it will take me some time to learn outside potty, please be patient with me. I want to please you!",
    },
    {
      title: "Big Golden Boy (TWINS)",
      image: "1gr.jpeg",
      petName: "Furry",
      species: "dog",
      breed: "Golden Retriever",
      sex: "Female",
      size: "Large",
      age: "1",
      medical: "Allergic to sun",
      ownerContactName: "Nat Yong",
      ownerContactEmail: "NatYong@gmail.com",
      ownerContactPhone: "92705624",
      ownerContactAddress: "18 Marina Boulevard",
      profileContact: {
        id: "716239asdad123h6712638",
        name: "Natalie Yong",
        email: "Natyong@gmail.com",
      },
      comments: "N.A.",
    },
    {
      title: "Big Golden Boy (TWINS)",
      image: "2gr.jpeg",
      petName: "Wuzzy",
      species: "dog",
      breed: "Golden Retriever",
      sex: "Male",
      size: "Large",
      age: "1",
      medical: "Allergic to Moon",
      ownerContactName: "Natalia Yong",
      ownerContactEmail: "NatYong1@gmail.com",
      ownerContactPhone: "92705624",
      ownerContactAddress: "18 Marina Boulevard",
      profileContact: {
        id: "716239a213123sdad123h6712638",
        name: "Natalia Yong",
        email: "Natyong1@gmail.com",
      },
      comments: "N.A.",
    },
    {
      title: "Ginger Mane",
      image: "1cat.jpeg",
      petName: "Ging",
      species: "cat",
      breed: "Red Ginger Cat",
      sex: "Male",
      size: "M",
      age: "3",
      medical: "Sleeps too much",
      ownerContactName: "Benzema Yong",
      ownerContactEmail: "Ben@gmail.com",
      ownerContactPhone: "92705224",
      ownerContactAddress: "12 Marina Boulevard",
      profileContact: {
        id: "716239a2213113123sdad123h6712638",
        name: "Benzema Yong",
        email: "Ben@gmail.com",
      },
      comments:
        "Healthy, immigrating and have to pass him on to a better owner.",
    },
    {
      title: "Wild Red Ginger Kitty",
      image: "2cat.jpeg",
      petName: "Saber",
      species: "cat",
      breed: "Red Ginger Cat",
      sex: "Female",
      size: "L",
      age: "6",
      medical: "Only have back legs",
      ownerContactName: "Benjamin Yong",
      ownerContactEmail: "Benja@gmail.com",
      ownerContactPhone: "92725224",
      ownerContactAddress: "17 Marina Boulevard",
      profileContact: {
        id: "716239a2213113123sdad123h6712638",
        name: "Benja Yong",
        email: "Benja@gmail.com",
      },
      comments: "Loves to scratch, furniture and humans alike",
    },
    {
      title: "10y.o. Bengal",
      image: "3cat.jpeg",
      petName: "Bengaleh",
      species: "cat",
      breed: "Bengal",
      sex: "Female",
      size: "S",
      age: "10",
      medical: "Only have front legs",
      ownerContactName: "BenjaminButton Yong",
      ownerContactEmail: "BenjaButton@gmail.com",
      ownerContactPhone: "92723224",
      ownerContactAddress: "99 Marina Boulevard",
      profileContact: {
        id: "716239a2213113123sdad123h6712638",
        name: "Benjamin Yong",
        email: "BenjaButton@gmail.com",
      },
      comments:
        "The perfect escape artist, never fails to escape from the house",
    },
    {
      title: "8y.o. bunny",
      image: "1bun.jpeg",
      petName: "Bobo",
      species: "others",
      breed: "Netherlands Dwarf/Lion Mane",
      sex: "Male",
      size: "S",
      age: "8",
      medical: "Too cute",
      ownerContactName: "Nat",
      ownerContactEmail: "Nat@gmail.com",
      ownerContactPhone: "93888077",
      ownerContactAddress: "910 Marina Boulevard",
      profileContact: {
        id: "716239a2213113123adfsdad123h6712638",
        name: "Nat Tan ",
        email: "Nat@gmail.com",
      },
      comments: "Idle champion, doesn't do shit at home. But cute",
    },

    (err, data) => {
      if (err) {
        console.log("GET /seed error:" + err.message);
        res.status(400).json({ status: "error", message: "seeding error" });
      } else {
        res.json({ status: "ok", message: "seeding successful" });
      }
    }
  );
});

module.exports = router;
