import { useFormik } from "formik";
 import { useUpdateUserPassword } from "../../hooks/user";
import { changePasswordSchema } from '../../validationSchemas';

const ChangePasswordPage = () => {
  const updateUserPassword = useUpdateUserPassword();

  /* Initialize formik with initial values for changing password */
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: ""
    },
    /* Add YUP validation schema for changing password */
    validationSchema: changePasswordSchema,
    /* Call updateUserPassword hook to make a request to server to update password */
    onSubmit: updateUserPassword
  })
  
  return (
    /* Change password form */
    <form onSubmit={formik.handleSubmit}>
      <h4 className="text-2xl font-bold">Change Password</h4>
      <div className="field">
        <label className="block">Current password:</label>
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="field">
        <label className="block">New password:</label>
        <input type="password" name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className="text-red-500">{formik.errors.newPassword}</div>
        ) : null}
      </div>
      <div className="field">
        <label className="block">Confirm new password:</label>
        <input type="password" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <button type="submit">Save changes</button>
    </form>
  )
}

export default ChangePasswordPage;