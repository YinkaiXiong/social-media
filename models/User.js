const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    city: {
      type: String,
      max: 40,
    },
    state: {
      type: String,
      max: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
