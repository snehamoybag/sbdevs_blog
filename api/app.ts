import "dotenv/config";
import express from "express";
import handleError404 from "./middlewares/handle-404.middleware";
import handleRequestError from "./middlewares/handle-req-error.middleware";
import * as routes from "./routes";

const app = express();

// BODY PARSERS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/", routes.index);
app.use("/blogs", routes.blogs);

// ERROR HANDLER
app.use(handleRequestError);

// 404 HANDLER
app.use(handleError404);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
