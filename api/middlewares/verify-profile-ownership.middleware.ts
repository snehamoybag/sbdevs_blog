import { RequestHandler } from "express";
import assertUser from "../libs/asserts/assert-user";
import ErrorForbidden from "../libs/http-exceptions/error-forbidden.http-exception";

const verifyProfileOwnership: RequestHandler = (req, _res, next) => {
  const user = assertUser(req);
  const reqProfileId = Number(req.params.id);

  if (user.profile?.id !== reqProfileId) {
    throw new ErrorForbidden("Profile is not yours.");
  }

  next();
};

export default verifyProfileOwnership;
