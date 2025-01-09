/* Product name regex for testing the product name input*/
const getProductPriceRegex = () => {
  return /^\d+(\.\d{1,2})?$/
};

module.exports = getProductPriceRegex;