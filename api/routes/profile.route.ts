import { Router } from "express";
import * as profileController from "../controllers/profile.controller";
import authenticateJWT from "../middlewares/auth/authenticate-jwt.middleware";
import verifyProfileOwnership from "../middlewares/verify-profile-ownership.middleware";

const profile = Router();

profile.put(
  "/:id",
  authenticateJWT,
  verifyProfileOwnership,
  profileController.update,
);

export default profile;
