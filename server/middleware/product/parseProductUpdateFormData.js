const formidable = require("formidable");
const { firstValues } = require("formidable/src/helpers/firstValues.js");

/* Parses incoming product update formdata */
const parseProductUpdateFormData = (req, res, next) => {
  try {
    const form = new formidable.IncomingForm({ 
      multiples: false, 
      keepExtensions: true,
      maxFileSize: 2 * 1024 * 1024 // 2 MB
    }); 

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Error parsing product formdata" });
      }

      if ( Object.keys(fields).length === 0 && !files.productImage) {
        return res.status(400).json({ errorMessage: "Product fields and files cannot be empty" });
      }

      if (files.productImage) {
        req.imageFile = Array.isArray(files.productImage) ? files.productImage[0] : files.productImage;
      }
      
      if ( Object.keys(fields).length > 0) {
        /* Use formidable firstValues method to get the first value of all the fields */
        const singleValues = firstValues(form, fields);

        if ("name" in singleValues) req.body.name = singleValues.name;
        if ("description" in singleValues) req.body.description = singleValues.description;
        if ("condition" in singleValues) req.body.condition = singleValues.condition;
        if ("price" in singleValues) req.body.price = singleValues.price;
        if ("stockQuantity" in singleValues) req.body.stockQuantity = singleValues.stockQuantity;
        if ("categoryId" in singleValues) req.body.categoryId = singleValues.categoryId;
      } 
      next();
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
    
};

module.exports = parseProductUpdateFormData;