/* Validate to make sure the value is not empty */
const isNotEmpty = (value) => { 
  return value !== "" && value !== null && value !== undefined;
};

export default isNotEmpty;