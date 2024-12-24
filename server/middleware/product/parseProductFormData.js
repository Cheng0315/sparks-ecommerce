const formidable = require("formidable");
const { firstValues } = require("formidable/src/helpers/firstValues.js");

/* Parses incoming product formdata */
const parseProductFormData = (req, res, next) => {
  try {
    const form = new formidable.IncomingForm({ 
      multiples: false, 
      keepExtensions: true,
      maxFileSize: 2 * 1024 * 1024 
    }); 

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Error parsing product formdata" });
      }

      if (!files.productImage) {
        return res.status(400).json({ errorMessage: "Error: Missing image file" });
      }
      
      /* Use formidable firstValues method to get the first value of all the fields */
      const singleValues = firstValues(form, fields);
      
      for (const field in singleValues) { 
        req.body[field] = singleValues[field]; 
      }

      req.imageFile = Array.isArray(files.productImage) ? files.productImage[0] : files.productImage;

      next();
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
    
};

module.exports = parseProductFormData;