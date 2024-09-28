/* Validate id from req.params */
const validateParamsId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ errorMessage: "Bad Request: Invalid ID" });
  }
  req.id = id; // Store the validated ID in the request object
  next();
};

module.exports = validateParamsId;
