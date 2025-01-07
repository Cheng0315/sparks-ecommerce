"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product, {foreignKey: "userId"});
      this.hasMany(models.Address, {foreignKey: "userId"});
    }
  }
  /* User model */
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    newsletterSubscription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    newsletterCouponUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    },
    refreshToken: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
    underscored: true
  });
  return User;
};