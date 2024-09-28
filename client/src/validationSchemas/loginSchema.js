import * as Yup from "yup";

/* Validation for user login form */
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required")
});

export default loginSchema;