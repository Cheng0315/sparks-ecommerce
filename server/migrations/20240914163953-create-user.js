'use strict';
/** @type {import('sequelize-cli').Migration} */

/* Migration for creating users table */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      newsletter_subscription: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      newsletter_coupon_used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_seller: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};