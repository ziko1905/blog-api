const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.set("409-status-reason", "Validation failure");
    return res.status(409).send({ validationMsgs: errors.array() });
  }
  next();
};
