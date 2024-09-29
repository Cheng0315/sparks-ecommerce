/* Validate id from req.params */
const validateParamsId = (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    if (!Number.isInteger(userId)) {
      return res.status(400).json({ errorMessage: "Bad Request: Invalid User ID" });
    }
    next();
  } catch (error) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

module.exports = validateParamsId;
