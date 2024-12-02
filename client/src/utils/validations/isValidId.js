/* Validate if the id value is a whole number greater than 0 */
const isValidId = (id) => { 
  return /^[1-9]\d*$/.test(id);
};

export default isValidId;