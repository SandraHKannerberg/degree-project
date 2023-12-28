function exists(Model) {
  return async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (document) return next();
    res.status(404).json(`Document with id: ${req.params.id} was not found.`);
  };
}

module.exports = {
  exists,
};
