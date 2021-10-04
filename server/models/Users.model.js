const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },  
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
