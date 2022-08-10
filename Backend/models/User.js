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
    profileType: {
      type: String,
      required: true,
    },
    contact: {
      address: {
        type: String,
      },
      phone: {
        type: Number,
      },
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
    favourites: {
      type: Array,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
