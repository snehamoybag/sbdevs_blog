import { RequestHandler, Request, Response, NextFunction } from "express";
import * as userValidation from "../validations/user.validations";
import { validationResult } from "express-validator";
import FailureResponse from "../libs/http-response-shapes/failure.response-shape";
import { createOne as createOneUser } from "../models/user.model";
import assertUser from "../libs/asserts/assert-user";
import SuccessResponse from "../libs/http-response-shapes/success.response-shape";

export const createUser: RequestHandler[] = [
  userValidation.newEmail(),
  userValidation.password(),
  userValidation.name(),
  userValidation.bio(),
  async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const mappedErrors = validationErrors.mapped();
      const statusCode = 400;

      res.status(statusCode).json(
        new FailureResponse("Validations failed.", statusCode, {
          errors: mappedErrors,
        }),
      );

      return;
    }

    const { email, password, name } = req.body;

    const user = await createOneUser(email, password, name);

    req.user = user;

    next();
  },
];

// call this only after issuing jwt
export const successfulSignupPost: RequestHandler = (req, res) => {
  const user = assertUser(req);
  const token = res.locals.token;

  res.json(
    new SuccessResponse(
      "Signup Successful. Use this token in the Authorization header as a Bearer token to authenticate future requests.",
      { user, token },
    ),
  );
};
