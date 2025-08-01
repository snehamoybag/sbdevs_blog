import multer, { diskStorage, Options } from "multer";
import ErrorBadRequest from "../libs/http-exceptions/error-bad-requeset.http-exception";
import assertUser from "../libs/asserts/assert-user";

const storageOptions: Options["storage"] = diskStorage({
  destination: "./public/uploads/", // make sure 'public/uploads' is already present in the root of the project

  filename(req, file, callback) {
    try {
      const user = assertUser(req);
      const uniqueFileName =
        crypto.randomUUID() + String(user.id) + file.originalname;

      callback(null, uniqueFileName);
    } catch (error) {
      if (error instanceof Error) {
        callback(error, file.filename);
        return;
      }

      callback(
        new Error("Failed to generate unique filename during the upload."),
        file.filename,
      );
    }
  },
});

const opts: Options = {
  storage: storageOptions,

  fileFilter(_req, file, callback) {
    if (file.mimetype.startsWith("image")) {
      callback(null, true); // accepet the file
      return;
    }

    callback(new ErrorBadRequest("Only image files are allowed."));
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
};

const localUpload = multer(opts);

export default localUpload;
