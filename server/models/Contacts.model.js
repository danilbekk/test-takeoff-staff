const { Schema, model } = require("mongoose");

const cotactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
});

const Contact = model("Contact", cotactSchema);

module.exports = Contact;

