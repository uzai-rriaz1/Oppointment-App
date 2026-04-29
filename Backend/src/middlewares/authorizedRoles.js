import { apiError } from "../utils/apiError.js";

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role))
      return next(new apiError(403, "Forbidden"));
    next();
  };
};

export default authorizedRoles;
