if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const cors = require('cors');
const express = require('express');
const app = express();
const { errHandler } = require("./middlewares/errHandler")

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json())

app.use("/", require("./routers"));

app.use(errHandler);

module.exports = app
    