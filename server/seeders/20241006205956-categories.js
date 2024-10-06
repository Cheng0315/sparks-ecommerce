'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Antiques'
      },
      {
        name: 'Appliances'
      },
      {
        name: 'Art'
      },
      {
        name: 'Automotive'
      },
      {
        name: 'Baby'
      },
      {
        name: 'Books'
      },
      {
        name: 'Fashion & Apparel'
      },
      {
        name: 'Electronics'
      },
      {
        name: 'Food & Beverages'
      },
      {
        name: 'Health & Beauty'
      },
      {
        name: 'Home & Garden'
      },
      {
        name: 'Instruments'
      },
      {
        name: 'Movies & Music'
      },
      {
        name: 'Office Supplies'
      },
      {
        name: 'Pet Supplies'
      },
      {
        name: 'Sports & Outdoors'
      },
      {
        name: 'DIY & Hardware'
      },
      {
        name: 'Toys & Games'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
