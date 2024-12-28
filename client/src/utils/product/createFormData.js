/* Utility function for creating product formdata */
const createFormData = (values, allowedFields) => {
  const formData = new FormData();

  allowedFields.forEach(field => {
    if (values[field]) {
      formData.append(field, values[field]);
    }
  });
  
  return formData;
};

export default createFormData;