const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");

module.exports.userController = {
  login: async (req, res) => {
    const { login, password } = req.body;
    try {
      const candidate = await User.findOne({ login });
      if (!candidate) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ status: "error", message: "Неверный логин" });
      }
      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ status: "error", message: "Неверный пароль" });
      }
      const payload = {
        // eslint-disable-next-line no-underscore-dangle
        id: candidate._id,
        login: candidate.login,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

     return res.json({
        token,
      });
    } catch (e) {
      return res.status(httpStatus.SERVICE_UNAVAILABLE).json({
        error: e.message,
      });
    }
  },
};
