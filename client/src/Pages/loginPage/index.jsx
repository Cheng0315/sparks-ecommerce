import { useFormik } from "formik";
import { login } from "../../services/auth/authService.js"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../features/auth/authSlice.js";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Initialize formik with initial values for login form*/
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      try {
        /* Call the login service to log the user in */
        const data = await login(values);

        /* Update the user and token in the Redux store */
        if (data) {
          dispatch(
            setAuth ({
              user: data.user,
              token: data.token
            })
          );
          navigate("/");
        }
      } catch (error) {
        console.error('Unable to register due to the following error: ', error);
      }
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