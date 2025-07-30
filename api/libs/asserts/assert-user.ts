import { Request } from "express";
import ErrorUnauthorised from "../http-exceptions/error-unauthorised.http-exception";
import SafeUser from "../../types/safe-user.type";

const assertUser = (req: Request): SafeUser => {
  if (!req.user) {
    throw new ErrorUnauthorised("Failed to authenticate user.");
  }

  const user = req.user;

  if (!user.id || !user.role) {
    throw new Error("User data mismatch.");
  }

  return user;
};

export default assertUser;
