/* Utility method for sanitizing product */
const sanitizeProduct = (product) => {
  const sanitizedProduct = product.toJSON();
  sanitizedProduct.price = sanitizedProduct.priceInCents / 100;
  delete sanitizedProduct.priceInCents;
  return sanitizedProduct;
}

module.exports = sanitizeProduct;