const express = require("express");
const Controller = require("../controllers/controller");
const char = express.Router();

char.get("/", Controller.getCharacter);

module.exports = char;
