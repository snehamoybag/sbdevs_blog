import { Router } from "express";
import * as signupController from "../controllers/signup.controller";
import issueJWT from "../middlewares/auth/issue-jwt.middleware";

const signup = Router();

signup.post(
  "/",
  signupController.createUser,
  issueJWT,
  signupController.successfulSignupPost,
);

export default signup;
