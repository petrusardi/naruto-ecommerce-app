const express = require("express");
const Controller = require("../controllers/controller");
const order = express.Router();
const { authorizationMember } = require("../middlewares/authorizationMember");

order.get("/", authorizationMember, Controller.getAllOrder);
order.delete("/:id", authorizationMember, Controller.deleteOrder);

module.exports = order;
