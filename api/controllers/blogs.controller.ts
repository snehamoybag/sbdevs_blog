import { RequestHandler } from "express";
import * as blogModel from "../models/blog.model";
import SuccessResponse from "../libs/http-response-shapes/success.response-shape";
import FailureResponse from "../libs/http-response-shapes/failure.response-shape";
import * as blogValidations from "../validations/blog.validations";
import assertUser from "../libs/asserts/assert-user";
import uploadToCloud from "../libs/utils/upload-to-cloud";
import { validationResult } from "express-validator";
import deleteLocalFile from "../libs/utils/delete-local-file";

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

export const createOne: RequestHandler[] = [
  blogValidations.title(),
  blogValidations.content(),
  blogValidations.status(),
  blogValidations.category(),
  blogValidations.tags(),

  // handle validation failures
  (req, res, next) => {
    const validationErrors = validationResult(req);
    const localImagesData = req.files;

    if (!validationErrors.isEmpty()) {
      const statusCode = 400;

      res.status(statusCode).json(
        new FailureResponse("Validations failed.", statusCode, {
          errors: validationErrors.mapped(),
        }),
      );

      // delete local files asyncronously in background
      if (Array.isArray(localImagesData) && localImagesData.length) {
        localImagesData.forEach((data) => deleteLocalFile(data.path));
      }

      return;
    }

    next();
  },

  // handle blog creation on successful validation
  async (req, res) => {
    const user = assertUser(req);
    const localImagesData = req.files;
    let cloudImagesData: { publicId: string; url: string }[] = [];

    if (Array.isArray(localImagesData) && localImagesData.length) {
      // upload to cloud
      const uploadPromises = localImagesData.map((data) => {
        return uploadToCloud(data.path);
      });

      const results = await Promise.all(uploadPromises);
      cloudImagesData = results.map((image) => ({
        publicId: image.public_id,
        url: image.secure_url || image.url,
      }));

      // delete local files asyncronously in background
      localImagesData.forEach((data) => deleteLocalFile(data.path));
    }

    const { title, content, status, category, tags } = req.body;
    const blog = await blogModel.create(
      user.id,
      title,
      content,
      status,
      category,
      cloudImagesData,
      tags,
    );

    res.json(new SuccessResponse("Blog created successfully.", { blog }));
  },
];
