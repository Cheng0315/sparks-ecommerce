import { useFormik } from "formik";
import { useRegisterUser } from "../../../hooks/user";
import { userRegistrationSchema } from "../../../validationSchemas"; 

const UserRegistrationPage = () => {
  const registerUser = useRegisterUser();


  /* Initialize formik with initial values registration form */
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    },
    /* Add YUP user registration validation schema */
    validationSchema: userRegistrationSchema,
    /* Call register hook to register the user */
    onSubmit: registerUser
  });
  
  return (
    /* Registration form */
    <form onSubmit={formik.handleSubmit}>
      <div className="field">
        <label>First Name:</label>
        <input type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500">{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-500">{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Username:</label>
        <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500">{formik.errors.username}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Email:</label>
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Password:</label>
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default UserRegistrationPage;