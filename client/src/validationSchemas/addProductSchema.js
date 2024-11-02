import * as Yup from "yup";

/* Validation for add product form */
const addProductSchema = Yup.object().shape({
  name: Yup.string()
    .required("Product name is required")
    .matches(/^[a-zA-Z0-9 ]{3,50}$/, "Product name must contain only letters, numbers, spaces, and between 3 to 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be between 5 and 500 characters long.")
    .max(500, "Description must be between 5 and 500 characters long."),
  condition: Yup.string()
    .required("Condition is required")
    .oneOf(
      ["new", "like new", "refurbished", "used", "open box", "damaged", "for parts"],
      "Condition must be one of the following: 'new', 'like new', 'refurbished', 'used', 'open box', 'damaged', or 'for parts'."
    ),
  price: Yup.number()
    .required("Price is required")
    .min(0.01, "Price must be at least $0.01")
    .max(100000, "Price must be less than $100,000")
    .test(
      "is-decimal",
      "Price must have at most two decimal places",
      value => (value !== undefined && /^\d+(\.\d{1,2})?$/.test(value))
    ),
  stockQuantity: Yup.number()
    .required("Stock quantity is required")
    .integer("Stock quantity must be an integer")
    .min(0, "Stock quantity cannot be negative")
    .max(1000, "Stock quantity cannot be more than 1000"),
  categoryId: Yup.number()
    .required("CategoryId is required")
    .integer("CategoryId must be an integer")
    .min(1, "CategoryId must be a number between 1 and 18")
    .max(18, "CategoryId must be a number between 1 and 18"),
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
