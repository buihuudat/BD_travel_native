const co = require("co");
const User = require("../models/UserModel");
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
    const { phone, password } = req.body;
    co(function* () {
      const user = yield User.findOne({ phone });
      if (!user) {
        const err = new Error("Phone not found");
        return err;
      }
      const desPass = Crypto.AES.decrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      );

      if (desPass !== user.password) {
        const err = new Error("Password is wrong");
        return err;
      }

      const token = jwt.sign({ user }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });

      const data = yield [user, token];

      return data;
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => res.status(500).json(err));
  },

  register: (req, res) => {
    const { phone, password } = req.body;
    co(function* () {
      const checkUser = yield User.findOne({ phone });
      if (checkUser) {
        const err = new Error("User is Exists");
        return err;
      }
      req.body.password = Crypto.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();
      const user = yield User.create(req.body);
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });

      const data = yield [user, token];
      return data;
    })
      .then((data) => res.status(201).json(data))
      .catch((err) => res.status(500).json(err));
  },
};
