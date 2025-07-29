import { RequestHandler } from "express";
import * as blogModel from "../models/blog.model";
import SuccessResponse from "../libs/http-response-shapes/success.response-shape";
import FailureResponse from "../libs/http-response-shapes/failure.response-shape";

export const getOne: RequestHandler = async (req, res) => {
  const blogId = Number(req.params.blogId);

  const blog = await blogModel.getOne(blogId);

  if (!blog) {
    const statusCode = 404;
    res
      .status(statusCode)
      .json(
        new FailureResponse(
          `Blog with the id ${blogId} is not found.`,
          statusCode,
        ),
      );

    return;
  }

  res.json(new SuccessResponse(`Blog with the id ${blogId}.`, { blog }));
};

export const getMany: RequestHandler = async (_req, res) => {
  const limit = 10;
  const offset = 0;
  const blogs = await blogModel.getMany(limit, offset);

  res.json(new SuccessResponse(`List of ${limit} blogs.`, { blogs }));
};
