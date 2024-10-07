import { useFormik } from "formik";
import { useUpdateUserInfo } from "../../hooks/user";
import { editUserInfoSchema } from '../../validationSchemas'; 
import { useSelector } from 'react-redux';

const EditUserInfoPage = () => {
  const user = useSelector((state) => state.user.user);
  const updateUserInfo = useUpdateUserInfo();

  /* Initialize formik with initial values for update user information form */
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    },
    /* Add YUP validation schema for update user information form */
    validationSchema: editUserInfoSchema,
    /* Call updateUserInfo hook to update user info */
    onSubmit: updateUserInfo
  });
  
  return (
    /* User update information form */
    <form onSubmit={formik.handleSubmit}>
      <div className="field">
        <label>First Name:</label>
        <input type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div className="field">
        <label>Username:</label>
        <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.username && formik.errors.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default EditUserInfoPage;