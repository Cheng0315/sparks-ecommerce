'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "userId"});
      this.hasMany(models.CartItem, {foreignKey: "cartId"});
    }
  }
  Cart.init({
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: "Cart",
    tableName: "carts",
    timestamps: false,
    underscored: true
  });
  return Cart;
};