import { RequestHandler } from "express";
import FailureResponse from "../libs/http-response-shapes/failure.response-shape";

const handleError404: RequestHandler = (_req, res) => {
  const statusCode = 404;

  res
    .status(statusCode)
    .json(
      new FailureResponse(
        "ErrorNotFound: The resource you're looking for doesn't exist or may have been deleted permanently.",
        statusCode,
      ),
    );
};

export default handleError404;
