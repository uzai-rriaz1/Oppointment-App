import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError.js";

const jwtAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return next(new apiError(405, "There is No Token Founded"));

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!user) return next(new apiError(400, "User is Not AUTHORIZED"));
    req.user = user;
    next();
  } catch (error) {
    return next(new apiError(500, "Server Error"));
  }
};

export default jwtAuth;
