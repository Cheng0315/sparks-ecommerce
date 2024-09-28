import * as Yup from "yup";

/* Validation for user registration form */
const userRegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(30, "First name must be at most 30 characters")
    .matches(/^[a-zA-Z]+$/, "First name can only contain letters"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(30, "Last name must be at most 30 characters")
    .matches(/^[a-zA-Z]+$/, "First name can only contain letters"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character")
    .required("Password is required")
});

export default userRegistrationSchema;
