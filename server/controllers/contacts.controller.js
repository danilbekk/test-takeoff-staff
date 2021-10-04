const httpStatus = require("http-status");
const Contact = require("../models/Contacts.model");

module.exports.contactController = {
  addContact: async (req, res) => {
    const { name, phoneNumber, email, age } = req.body;
    if (!name) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: "error", message: "Введите имя" });
    }

    if (!phoneNumber) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: "error", message: "Введите номер" });
    }
    try {
     const contact =  await Contact.create({
        name,
        phoneNumber,
        email,
        age,
      });
      return res.json({ status: "sucsses", message: "Контакт добавлен", contact });
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        status: "error",
        message: e.message,
      });
    }
  },
  getContacts: async (req, res) => {
    try {
      const contacts = await Contact.find();

    return  res.json(contacts);
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        status: "error",
        message: e.message,
      });
    }
  },
  editContact: async (req, res) => {
    try {
      const { name, email, phoneNumber, age } = req.body;
      const { id } = req.params;
      const options = { new: true };

       await Contact.findByIdAndUpdate(
        id,
        { name, email, phoneNumber, age },
        options
      );
    return  res.json({ status: "sucsses", message: "Контакт обновлен" });
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        status: "error",
        message: e.message,
      });
    }
  },
  deleteContact: async (req, res) => {
    const { id } = req.params;
    try {
      await Contact.findByIdAndDelete(id);
     return res.json({ status: "sucsses", message: "Контакт удален" });
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        status: "error",
        message: e.message,
      });
    }
  },
};
