/** Validate request body based on a joi schema */
function validate(joiSchema) {
  return (req, res, next) => {
    const validation = joiSchema.validate(req.body);
    if (!validation.error) return next();
    res.status(400).json(validation.error.message);
  };
}

/** Check existence */
function exists(Model) {
  return async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (document) return next();
    res.status(404).json(`Document with id: ${req.params.id} was not found.`);
  };
}

module.exports = {
  exists,
  validate,
};
