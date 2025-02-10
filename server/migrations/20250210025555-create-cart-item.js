'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      cart_item_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'cart_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'product_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items');
  }
};