import "dotenv/config";
import passport, { AuthenticateCallback } from "passport";
import {
  ExtractJwt,
  Strategy as JWTStrategy,
  StrategyOptionsWithoutRequest,
  VerifyCallback,
} from "passport-jwt";
import { getById as getUserById } from "../../models/user.model";
import { RequestHandler } from "express";
import ErrorUnauthorised from "../../libs/http-exceptions/error-unauthorised.http-exception";

const PRIVATE_KEY = String(process.env.JWT_KEY);

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer <token>
  secretOrKey: PRIVATE_KEY,
};

const verifyCallback: VerifyCallback = async (payload, done) => {
  try {
    const userId = Number(payload.sub);
    const user = getUserById(userId);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

// setup strategy
passport.use(new JWTStrategy(options, verifyCallback));

// use this middleware to authorise token to login user
const authenticateJWT: RequestHandler = (req, res, next) => {
  const authenticateCallback: AuthenticateCallback = (err, user) => {
    if (err) {
      next(err);
      return;
    }

    if (!user) {
      next(new ErrorUnauthorised("Invalid auth token."));
      return;
    }

    req.user = user;

    next();
  };

  return passport.authenticate("jwt", { session: false }, authenticateCallback)(
    req,
    res,
    next,
  );
};

export default authenticateJWT;
