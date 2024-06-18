const express = require("express");
const router = express.Router();

router.use("/character", require("./character"));
router.use(require("./auth"));
router.use("/figure", require("./figure"));
router.use("/order", require("./order"));

module.exports = router;
