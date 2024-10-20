const upload = require("../../config/multerConfig");

/* Upload product image */
const uploadProductImage = (req, res, next) => {
  try {
    const user = req.authUser;
    if (user.role !== "seller") return res.status(401).json({errorMessage: "Access Denied"});

    upload.single("image")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ errorMessage: "Invalid file type. Only image files are allowed." });
        }

        if (req.file) {
            req.body.imageUrl = `public/assets/${req.file.filename}`;
            next();
        } else {
            return res.status(400).json({ errorMessage: "No file uploaded." });
        }
    });
  } catch (error) {
    res.status(500).json({ errorMessage: 'Internal Server Error' });
  }
    
};

module.exports = uploadProductImage;