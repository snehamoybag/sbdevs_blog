import { Router } from "express";
import * as profileController from "../controllers/profile.controller";
import authenticateJWT from "../middlewares/auth/authenticate-jwt.middleware";
import verifyProfileOwnership from "../middlewares/verify-profile-ownership.middleware";
import localUpload from "../configs/multer.config";

const profile = Router();

profile.put(
  "/:id",
  authenticateJWT,
  verifyProfileOwnership,
  localUpload.single("avatar"), // handle avatar upload
  profileController.update,
);

export default profile;
