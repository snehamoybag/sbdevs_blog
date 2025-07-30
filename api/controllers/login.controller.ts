import { RequestHandler } from "express";
import SuccessResponse from "../libs/http-response-shapes/success.response-shape";

export const successfulLoginPost: RequestHandler = (req, res) => {
  res.json(
    new SuccessResponse(
      "Login successful. Use this token in the Authorization header as a Bearer token to authenticate future requests.",
      { user: req.user, token: res.locals.user },
    ),
  );
};
