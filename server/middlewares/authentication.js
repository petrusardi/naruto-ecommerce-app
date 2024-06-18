const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "Error authentication" };
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      throw { name: "Error authentication" };
    }
    const { id } = verifyToken(token);
    if (!id) {
      throw { name: "Error authentication" };
    }
    const user = await User.findByPk(id);
    if (!user) throw { name: "Error authentication" };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication };