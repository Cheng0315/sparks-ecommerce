import { useFormik } from "formik";

const LoginPage = () => {

  /* Initialize formik with initial values for login form*/
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
    
    }
  })
  
  return (
    /* Login form */
    <form onSubmit={formik.handleSubmit}>
      <div className="field">
        <label>Email:</label>
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
      </div>
      <div className="field">
        <label>Password:</label>
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginPage;