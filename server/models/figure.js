"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Figure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Figure.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Figure.init(
    {
      title: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Figure",
    }
  );
  return Figure;
};
