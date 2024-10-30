"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Antiques"
      },
      {
        name: "Appliances"
      },
      {
        name: "Art"
      },
      {
        name: "Automotive"
      },
      {
        name: "Baby"
      },
      {
        name: "Books"
      },
      {
        name: "DIY & Hardware"
      },
      {
        name: "Electronics"
      },
      {
        name: "Fashion & Apparel"
      },
      {
        name: "Food & Beverages"
      },
      {
        name: "Health & Beauty"
      },
      {
        name: "Home & Garden"
      },
      {
        name: "Movies & Music"
      },
      {
        name: "Office Supplies"
      },
      {
        name: "Pet Supplies"
      },
      {
        name: "Sports & Outdoors"
      },
      {
        name: "Toys & Games"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
