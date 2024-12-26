const path = require("path");
const { generateProductFilename } = require("../../utils/product")
const fs = require("fs");

/* Upload product image */
const uploadProductImage = (req, res, next) => {
  try {
    if (!req.imageFile) return next();
    
    const imageFile = req.imageFile;

    const newFilename = generateProductFilename(imageFile.originalFilename);
    const newPath = path.join(__dirname, "../../public/assets", newFilename);

    /* Move the image file to the public/assets directory */
    fs.rename(imageFile.filepath, newPath, (err) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Error saving file" });
      }

      req.body.imageUrl = `/public/assets/${newFilename}`;
      next();
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
    
};

module.exports = uploadProductImage;