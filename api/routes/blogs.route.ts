import { Router } from "express";
import * as blogsController from "../controllers/blogs.controller";

const blogs = Router();

// /blogs/?limit=30&offset=0
blogs.get("/", blogsController.getMany);

// /blogs/:blogId
blogs.get("/:blogId", blogsController.getOne);

export default blogs;
