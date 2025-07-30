import "dotenv/config";
import { RequestHandler } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import assertUser from "../../libs/asserts/assert-user";

const PRIVATE_KEY = String(process.env.JWT_KEY);

// call this only after successful login authentication
const issueJWT: RequestHandler = (req, res, next) => {
  const user = assertUser(req);

  const payload = {
    sub: user.id,
    role: user.role,
  };

  const options: SignOptions = {
    expiresIn: "7d",
  };

  jwt.sign(payload, PRIVATE_KEY, options, (err, token) => {
    if (err) {
      next(err);
      return;
    }

    if (!token) {
      next(new Error("Failed to generate JWT."));
      return;
    }

    res.locals.token = token;

    next();
  });
};

export default issueJWT;
