const path = require("path");

/* Utility method for generating product filename */
const generateProductFilename = (originalProductName) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = path.extname(originalProductName);
  const baseName = path.basename(originalProductName, ext);
  return `${baseName}-${uniqueSuffix}${ext}`;
};

module.exports = generateProductFilename;