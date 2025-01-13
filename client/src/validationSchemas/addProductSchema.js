import * as Yup from "yup";

/* Validation for add product form */
const addProductSchema = Yup.object().shape({
  name: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters")
    .max(50, "Product name must be most 50 characters")
    .matches(/^[a-zA-Z0-9 ]{3,50}$/, "Product name must contain only letters, numbers, spaces"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must be most 500 characters"),
  condition: Yup.string()
    .required("Condition is required")
    .oneOf(
      ["new", "like new", "refurbished", "used", "open box", "damaged", "for parts"],
      "Condition must be one of the following: 'new', 'like new', 'refurbished', 'used', 'open box', 'damaged', or 'for parts'."
    ),
  price: Yup.number()
    .required("Price is required")
    .min(0.01, "Price must be at least $0.01")
    .max(100000, "Price must be at most $100,000")
    .test(
      "is-decimal",
      "Price must have at most two decimal places",
      value => value === null || value === undefined || /^\d+(\.\d{1,2})?$/.test(value)
    ),
  stockQuantity: Yup.number()
    .required("StockQuantity is required")
    .integer("Stock quantity must be an integer")
    .min(1, "Stock quantity must be at least 1")
    .max(1000, "Stock quantity must be at most 1000"),
  categoryId: Yup.number()
    .required("CategoryId is required")
    .integer("CategoryId must be an integer")
    .min(1, "CategoryId must be at least 1")
    .max(18, "CategoryId must be at most 18"),
  productImage: Yup.mixed()
    .required("An image of the product is required")
    .test("fileType", "Unsupported File Format", (value) => {
      return value && ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(value.type);
    })
    .test("fileSize", "File Size is too large", (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2MB
    }),
});

export default addProductSchema;
