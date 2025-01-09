/* Product name regex for testing the product name input*/
const getProductNameRegex = () => {
  return /^[a-zA-Z0-9 ]{3,50}$/
};

module.exports = getProductNameRegex;