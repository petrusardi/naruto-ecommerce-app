const { Figure } = require("../models");

const authorizationMember = async (req, res, next) => {
  try {
    if (req.user.role === "Admin") {
      next();
    } else if (req.user.role === "Staff") {
      const figure = await Figure.findByPk(+req.params.id);
      if (!figure) throw { name: "Error not found" };
      if (req.user.id == figure.UserId) {
        next(); 
      } else {
        throw { name: "Forbidden error di authorization" };
      }
    } else {
      throw { name: "Forbidden error di authorization" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorizationMember };