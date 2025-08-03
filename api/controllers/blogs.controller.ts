import { RequestHandler } from "express";
import * as blogModel from "../models/blog.model";
import SuccessResponse from "../libs/http-response-shapes/success.response-shape";
import FailureResponse from "../libs/http-response-shapes/failure.response-shape";
import * as blogValidations from "../validations/blog.validations";
import localUpload from "../configs/multer.config";
import assertUser from "../libs/asserts/assert-user";
import uploadToCloud from "../libs/utils/upload-to-cloud";
import { validationResult } from "express-validator";

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

  localUpload.array("images"),

  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const statusCode = 400;

      res.status(statusCode).json(
        new FailureResponse("Validations failed.", statusCode, {
          errors: validationErrors.mapped(),
        }),
      );

      return;
    }

    const user = assertUser(req);
    const imagesLocalData = req.files;
    let images: { publicId: string; url: string }[] = [];

    if (Array.isArray(imagesLocalData)) {
      const uploadPromises = imagesLocalData.map((image) => {
        return uploadToCloud(image.path);
      });

      const results = await Promise.all(uploadPromises);
      images = results.map((image) => ({
        publicId: image.public_id,
        url: image.secure_url || image.url,
      }));
    }

    const { title, content, status, category, tags } = req.body;
    const blog = await blogModel.create(
      user.id,
      title,
      content,
      status,
      category,
      images,
      tags,
    );

    res.json(new SuccessResponse("Blog created successfully.", { blog }));
  },
];
