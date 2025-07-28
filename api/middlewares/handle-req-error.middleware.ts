import { ErrorRequestHandler } from "express";
import HttpException from "../libs/http-exceptions/http-exception";
import ErrorResponse from "../libs/http-response-shapes/error.response-shape";

const handleRequestError: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpException) {
    res.status(err.code).json(new ErrorResponse(err.message, err.code));
    return;
  }

  const statusCode = 500;

  if (err instanceof Error) {
    res.status(statusCode).json(new ErrorResponse(err.message, statusCode));
    return;
  }

  // everything else
  res
    .status(statusCode)
    .json(
      new ErrorResponse(
        "ErrorInternalServer: an unknown internal server error has occured.",
        statusCode,
      ),
    );
};

export default handleRequestError;
