const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      // data: Buffer, // how to store our images **
      type: String,
      // required: true,
      // unique: true,
    },
    petName: {
      type: String,
      // required: true,
    },
    species: {
      type: String,
      // required: true,
    },
    breed: {
      type: String,
      // required: true,
    },
    sex: {
      type: String,
      // required: true,
    },
    size: {
      type: String,
      // required: true,
    },
    age: {
      type: String,
    },
    medical: {
      type: String,
    },
    isArchive: {
      type: Boolean,
      required: true,
      default: false,
    },
    favouritesCount: {
      type: Number,
      required: true,
      default: 0,
    },
    ownerContactName: {
      type: String,
    },
    ownerContactEmail: {
      type: String,
    },
    ownerContactPhone: {
      type: Number,
    },
    ownerContactAddress: {
      type: String,
    },
    profileContact: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    comments: {
      type: String,
    },
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { collection: "listings" }
);

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
