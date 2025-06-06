'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cart, {foreignKey: "cartId"});
      this.belongsTo(models.Product, {foreignKey: "productId"});
    }
  }
  CartItem.init({
    cartItemId: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: "CartItem",
    tableName: "cart_items",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['cartId', 'productId']
      }
    ]
  });
  return CartItem;
};