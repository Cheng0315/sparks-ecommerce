import { useFormik } from "formik";
import { getUSStatesArray } from "../../../utils/address";
import { addAddressSchema } from "../../../validationSchemas"; 
import useAddData from "../../../hooks/useAddData";

const AddAddressPage = () => {
  const addData = useAddData();
  const statesList = getUSStatesArray();
  
  /* Initialize formik with initial values for adding address */
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      street: "",
      addressUnit: "",
      city: "",
      state: "",
      zipCode: ""
    },
    /* Add YUP to validate address inputs */
    validationSchema: addAddressSchema,
    /* Call addAddress hook to make an add-address request to the server */
    onSubmit: (values) => {
      addData("/api/addresses", values);
    }
  });

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">Add Address</h2>
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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Address</button>
      </form>
    </div>
  );
};

export default AddAddressPage;
