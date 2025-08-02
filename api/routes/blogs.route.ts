import { Router } from "express";
import * as blogsController from "../controllers/blogs.controller";
import authenticateJWT from "../middlewares/auth/authenticate-jwt.middleware";
import verifyBlogWriteAccess from "../middlewares/verify-blog-write-access.middleware";

const blogs = Router();

// /blogs/?limit=30&offset=0
blogs.get("/", blogsController.getMany);
blogs.post(
  "/",
  authenticateJWT,
  verifyBlogWriteAccess,
  blogsController.createOne,
);

// /blogs/:blogId
blogs.get("/:blogId", blogsController.getOne);

export default blogs;
