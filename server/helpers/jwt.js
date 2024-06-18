const jwt = require("jsonwebtoken");

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const verifyToken = (access_token) => {
    return jwt.verify(access_token,process.env.JWT_SECRET);
};

module.exports = {createToken, verifyToken}