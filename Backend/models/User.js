const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "default_profile.jpg",
    },
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
