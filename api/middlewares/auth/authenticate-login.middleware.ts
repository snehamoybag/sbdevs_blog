import { RequestHandler } from "express";
import FailureResponse from "../../libs/http-response-shapes/failure.response-shape";
import { FieldValidationError } from "express-validator";
import {
  getIsPasswordMatching,
  getByEmail as getUserByEmail,
} from "../../models/user.model";

const getFieldValidationErrorShape = (
  path: string,
  value: string,
  msg: string,
): Record<string, FieldValidationError> => {
  return {
    [path]: {
      type: "field",
      location: "body",
      path,
      value,
      msg,
    },
  };
};

const authenticateLogin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const validationErrorMessage = "Login failed.";
  const validationErrorStatusCode = 400;

  if (typeof email !== "string") {
    const errorData = getFieldValidationErrorShape(
      "email",
      "",
      "Email must be of type string.",
    );

    res.status(validationErrorStatusCode).json(
      new FailureResponse(validationErrorMessage, validationErrorStatusCode, {
        errors: errorData,
      }),
    );

    return;
  }

  if (typeof password !== "string") {
    const errorData = getFieldValidationErrorShape(
      "password",
      "",
      "Password must be of type string.",
    );

    res.status(validationErrorStatusCode).json(
      new FailureResponse(validationErrorMessage, validationErrorStatusCode, {
        errors: errorData,
      }),
    );

    return;
  }

  const userWithEmail = await getUserByEmail(email);

  if (!userWithEmail) {
    const errorData = getFieldValidationErrorShape(
      "email",
      email,
      "Incorrect email address.",
    );

    res.status(validationErrorStatusCode).json(
      new FailureResponse(validationErrorMessage, validationErrorStatusCode, {
        errors: errorData,
      }),
    );

    return;
  }

  const isPasswordMatching = await getIsPasswordMatching(email, password);

  if (!isPasswordMatching) {
    const errorData = getFieldValidationErrorShape(
      "password",
      password,
      "Incorrect password",
    );

    res.status(validationErrorStatusCode).json(
      new FailureResponse(validationErrorMessage, validationErrorStatusCode, {
        errors: errorData,
      }),
    );

    return;
  }

  req.user = userWithEmail;

  // user authenticated move to next middleware
  next();
};

export default authenticateLogin;
