const path = require("path");

/* Validate product image file*/
const validateProductImage = (req, res, next) => {
  try {
    
    const imageFile = req.imageFile;
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(imageFile.mimetype);
    const extname = fileTypes.test(path.extname(imageFile.originalFilename).toLowerCase());

    if (!mimeType || !extname) {
      return res.status(400).json({ errorMessage: "Only image files are allowed!" });
    }

    next();
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
    
};

module.exports = validateProductImage;