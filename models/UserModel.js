const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, default: null },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    permission: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
