import { useFormik } from "formik";
import { getUSStatesArray } from "../../../utils/address";
import { addressSchema } from "../../../validationSchemas";
import { useParams, Navigate } from "react-router-dom";
import { isPositiveInteger } from "../../../utils/validations";
import useUpdateData from "../../../hooks/useUpdateData";
import useFetchData from "../../../hooks/useFetchData";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const EditAddressPage = () => {
  const statesList = getUSStatesArray();
  const { addressId } = useParams();
  const user = useSelector((state) => state.user.user);
  const updateData = useUpdateData();

  if (!isPositiveInteger(addressId)) return <Navigate to="/page-not-found" />;

  const { data, isLoading, error } = useFetchData(`/api/addresses/${addressId}`);
  
  /* Initialize formik with initial values for editing address */
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      street: "",
      addressUnit: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: ""
    },
    /* Add YUP to validate address inputs */
    validationSchema: addressSchema,
    /* Call editAddress hook to make an edit-address request to the server */
    onSubmit: (values) => {
      updateData(`/api/addresses/${addressId}`, values, data.address);
    }
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        firstName: data.address.firstName || "",
        lastName: data.address.lastName || "",
        street: data.address.street || "",
        addressUnit: data.address.addressUnit || "",
        city: data.address.city || "",
        state: data.address.state || "",
        zipCode: data.address.zipCode || "",
        phoneNumber: data.address.phoneNumber || ""
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <Navigate to="/page-not-found" />;
    
  if (data?.address && data?.address.userId !== user.userId) return <Navigate to="/page-not-found" />;

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Edit Address</h2>
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
          <label>Street:</label>
          <input type="text" name="street" value={formik.values.street} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.street && formik.errors.street ? (
            <div className="text-red-500">{formik.errors.street}</div>
          ) : null}
        </div>
        <div className="field">
          <label>Apt, suite, etc:</label>
          <input type="text" name="addressUnit" value={formik.values.addressUnit} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.addressUnit && formik.errors.addressUnit ? (
            <div className="text-red-500">{formik.errors.addressUnit}</div>
          ) : null}
        </div>
        <div className="field">
          <label>City:</label>
          <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500">{formik.errors.city}</div>
          ) : null}
        </div>
        <div className="field">
          <label>State:</label>
          <select name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded p-2 w-full" >
            <option value="" label="Select state" />
            {statesList.map((state) => ( <option key={state.value} value={state.value} label={state.label} /> ))}
          </select>
          {formik.touched.state && formik.errors.state ? (
            <div className="text-red-500">{formik.errors.state}</div>
          ) : null}
        </div>
        <div className="field">
          <label>Zip Code:</label>
          <input type="text" name="zipCode" value={formik.values.zipCode} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.zipCode && formik.errors.zipCode ? (
            <div className="text-red-500">{formik.errors.zipCode}</div>
          ) : null}
        </div>
        <div className="field">
          <label>Phone Number:</label>
          <input type="number" name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-red-500">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Update Address</button>
      </form>
    </div>
  );
};

export default EditAddressPage;