'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "UserId" })
      Order.belongsTo(models.Figure, { foreignKey: "FigureId" })
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    FigureId: DataTypes.INTEGER,
    statusPaid: {
      type:DataTypes.STRING,
      defaultValue:"Unpaid"
    },
    quantity: {
      type:DataTypes.INTEGER,
      defaultValue:1
    },
    totalPrice: {
      type:DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};