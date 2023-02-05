const authController = require("../controller/authController");

const Router = require("express").Router();

Router.post("/login", authController.login);
Router.post("/register", authController.register);
module.exports = Router;
