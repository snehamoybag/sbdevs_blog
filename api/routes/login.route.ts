import { Router } from "express";
import authenticateLogin from "../middlewares/auth/authenticate-login.middleware";
import issueJWT from "../middlewares/auth/issue-jwt.middleware";
import * as loginController from "../controllers/login.controller";

const login = Router();

login.post(
  "/",
  authenticateLogin,
  issueJWT,
  loginController.successfulLoginPost,
);

export default login;
