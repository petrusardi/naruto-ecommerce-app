const express = require("express");
const Controller = require("../controllers/controller");
const fig = express.Router();
const { authorizationMember } = require("../middlewares/authorizationMember");

fig.get("/", Controller.getFig);
fig.post("/", Controller.postFig);
fig.get("/:id", Controller.getDetailFig);
fig.post("/:FigureId", Controller.getOrder);
fig.put("/:id", Controller.updateFig);
fig.delete("/:id", Controller.deleteFig);

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
fig.patch(
  "/:id/img",
  authorizationMember,
  upload.single("imageUrl"),
  Controller.updateImg
);

module.exports = fig;
