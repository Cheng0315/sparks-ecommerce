import { useFormik } from "formik";
import useRegister from "../../hooks/users/useRegister.js";

const UserRegistrationPage = () => {
  const register = useRegister();


  /* Initialize formik with initial values registration form */
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    },
    /* Called register hook to register the user */
    onSubmit: register
  });
  
  return (
    /* Registration form */
    <form onSubmit={formik.handleSubmit}>
      <div className="field">
        <label>First Name:</label>
        <input type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} />
      </div>
      <div className="field">
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} />
      </div>
      <div className="field">
        <label>Username:</label>
        <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} />
      </div>
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

export default UserRegistrationPage;