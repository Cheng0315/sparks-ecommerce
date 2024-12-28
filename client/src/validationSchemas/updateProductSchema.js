import * as Yup from "yup";

/* Validation for update product form */
const updateProductSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z0-9 ]{3,50}$/, "Product name must contain only letters, numbers, spaces, and between 3 to 50 characters"),
  description: Yup.string()
    .min(5, "Description must be between 5 and 500 characters long.")
    .max(500, "Description must be between 5 and 500 characters long."),
  condition: Yup.string()
    .oneOf(
      ["new", "like new", "refurbished", "used", "open box", "damaged", "for parts"],
      "Condition must be one of the following: 'new', 'like new', 'refurbished', 'used', 'open box', 'damaged', or 'for parts'."
    ),
  price: Yup.number()
    .min(0.01, "Price must be at least $0.01")
    .max(100000, "Price must be less than $100,000")
    .test(
      "is-decimal",
      "Price must have at most two decimal places",
      value => value === null || value === undefined || /^\d+(\.\d{1,2})?$/.test(value)
    ),
  stockQuantity: Yup.number()
    .integer("Stock quantity must be an integer")
    .min(0, "Stock quantity cannot be negative")
    .max(1000, "Stock quantity cannot be more than 1000"),
  categoryId: Yup.number()
    .integer("CategoryId must be an integer")
    .min(1, "CategoryId must be a number between 1 and 18")
    .max(18, "CategoryId must be a number between 1 and 18"),
  productImage: Yup.mixed()
    .test("fileType", "Unsupported File Format", (value) => {
      return value === null || value === undefined || ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(value.type);
    })
    .test("fileSize", "File Size is too large", (value) => {
      return value === null || value === undefined || value.size <= 2 * 1024 * 1024
    }),
});

export default updateProductSchema;