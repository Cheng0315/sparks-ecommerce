/* Export all routes*/
const userRoutes = require("./user");
const productRoutes = require("./product");
const addressRoutes = require("./address");
const cartRoutes = require("./cart");

module.exports = {
  userRoutes,
  productRoutes,
  addressRoutes,
  cartRoutes
};
