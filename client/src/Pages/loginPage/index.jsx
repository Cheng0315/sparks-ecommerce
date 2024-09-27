import { useFormik } from "formik";
import useLogin from "../../hooks/users/useLogin.js";
import { loginSchema } from '../../validationSchemas'; 

const LoginPage = () => {
  const login = useLogin()

  /* Initialize formik with initial values for login form*/
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    /* Add YUP login validation schema */
    validationSchema: loginSchema,
    /* Call login hook to log the user in */
    onSubmit: login
  })
  
  return (
    /* Login form */
    <form onSubmit={formik.handleSubmit}>
      <div className="field">
        <label>Email:</label>
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Password:</label>
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginPage;