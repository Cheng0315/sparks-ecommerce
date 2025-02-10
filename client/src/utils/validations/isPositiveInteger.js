/* Validate if the id value is a whole number greater than 0 */
const isPositiveInteger = (id) => { 
  return /^[1-9]\d*$/.test(id);
};

export default isPositiveInteger;