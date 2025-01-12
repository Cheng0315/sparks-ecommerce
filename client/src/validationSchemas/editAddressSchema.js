import * as Yup from "yup";

/* Validation for edit address form */
const editAddressSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, "First name must be at most 30 characters")
    .matches(/^[a-zA-Z]+$/, "First name can only contain letters"),
  lastName: Yup.string()
    .max(30, "Last name must be at most 30 characters")
    .matches(/^[a-zA-Z]+$/, "Last name can only contain letters"),
  street: Yup.string()
    .min(3, "Street address must be at least 3 characters")
    .max(100, "Street address must be at most 100 characters")
    .matches(/^[a-zA-Z0-9\s,."-]{3,100}$/, "Street address contains invalid characters"),
  addressUnit: Yup.string()
    .max(50, "Address unit must be at most 50 characters")
    .matches(/^[a-zA-Z0-9\s,.'-]{1,50}$/, "Address unit contains invalid characters"),
  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters")
    .matches(/^[a-zA-Z\s-]{2,50}$/, "City contains invalid characters"),
  state: Yup.string(),
  zipCode: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, "Zip code must be a valid format (e.g., 12345 or 12345-6789)"),
});

export default editAddressSchema;
