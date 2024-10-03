import * as Yup from "yup";

/* Validation for user update information form */
const editUserInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(30, "First name must be at most 30 characters")
    .matches(/^[a-zA-Z]+$/, "First name can only contain letters"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(30, "Last name must be at most 30 characters")
    .matches(/^[a-zA-Z]+$/, "Last name can only contain letters"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
});

export default editUserInfoSchema;
