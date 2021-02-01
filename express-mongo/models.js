const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLengh: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLengh: 8,
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
exports.User = User;