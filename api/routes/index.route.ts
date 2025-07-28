import { Router } from "express";
import SuccessResponse from "../libs/http-response-shapes/success.response-shape";

const index = Router();

index.get("/", (_req, res) => {
  res.json(
    new SuccessResponse("Hi from SBDEVS Blog!", {
      name: "SBDEVS_Blog API",
      version: "1.0.0",
    }),
  );
});

export default index;
