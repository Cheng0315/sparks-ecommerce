const formidable = require("formidable");
const { firstValues } = require("formidable/src/helpers/firstValues.js");

/* Parses incoming product formdata */
const parseProductFormData = (req, res, next) => {
  try {
    const user = req.authUser;
    if (user.role !== "seller") return res.status(401).json({errorMessage: "Access Denied"});
    
    const form = new formidable.IncomingForm({ 
      multiples: false, 
      keepExtensions: true,
      maxFileSize: 2 * 1024 * 1024 // 2 MB
    }); 

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Error parsing product formdata" });
      }

      if (files.productImage) {
        req.imageFile = Array.isArray(files.productImage) ? files.productImage[0] : files.productImage;
      }
      
      if (Object.keys(fields).length > 0) {
        /* Use formidable firstValues method to get the first value of all the fields */
        const singleValues = firstValues(form, fields);
        const allowedFields = ["name", "description", "condition", "price", "stockQuantity", "categoryId"];
  
        allowedFields.forEach(field => {
          if (field in singleValues) {
            req.body[field] = singleValues[field];
          }
        });
      }

      next();
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
    
};

module.exports = parseProductFormData;