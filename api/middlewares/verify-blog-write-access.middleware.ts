import { RequestHandler } from "express";
import assertUser from "../libs/asserts/assert-user";
import ErrorForbidden from "../libs/http-exceptions/error-forbidden.http-exception";

const verifyBlogWriteAccess: RequestHandler = (req, _res, next) => {
  const user = assertUser(req);

  if (user.role.trim().toUpperCase() !== "ADMIN") {
    throw new ErrorForbidden("You don't permission to write a blog.");
  }

  next();
};

export default verifyBlogWriteAccess;
