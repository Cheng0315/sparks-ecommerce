import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../../services/auth/authService.js"

const UserRegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  /* Initialize formik with initial values registration form */
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      try {
        /* Call the registerUser service to register the user*/
        const data = await registerUser(values);

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