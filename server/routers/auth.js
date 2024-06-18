const express = require("express");
const Controller = require("../controllers/controller");
const auth = express.Router();
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorizationAdminOnly");

auth.post("/login", Controller.login);
// auth.use(authentication);
auth.post("/add-user", Controller.addUser);
auth.post("/login/google", Controller.googleLogin);

module.exports = auth;
