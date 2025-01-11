import { useFormik } from "formik";
import { useUpdateUserData } from "../../../hooks/user";
import { loginSchema } from "../../../validationSchemas";
import { useSelector } from "react-redux";

const EditEmailPage = () => {
  const user = useSelector((state) => state.user.user);
  const updateUserData = useUpdateUserData();

  /* Initialize formik with initial values for edit email form */
  const formik = useFormik({
    initialValues: {
      email: user.email,
      password: ""
    },
    /* Add YUP validation schema for email and password */
    validationSchema: loginSchema,
    /* Call useEditUserEmail hook to make a request to server to update email */
    onSubmit: (values) => {
      const url = `/api/users/${user.userId}/update-email`;
      updateUserData(url, values);
    }
  });
  
  return (
    /* Edit email form */
    <form onSubmit={formik.handleSubmit}>
      <h4 className="text-2xl font-bold">Edit Email</h4>
      <div className="field">
        <label className="block">Email:</label>
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="field">
        <label className="block">Password:</label>
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit">Update</button>
    </form>
  )
}

export default EditEmailPage;