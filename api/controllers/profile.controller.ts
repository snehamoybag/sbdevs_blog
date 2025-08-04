import { RequestHandler } from "express";
import * as profileModel from "../models/profile.model";
import * as profileValidations from "../validations/profile.validations";
import SuccessResponse from "../libs/http-response-shapes/success.response-shape";
import uploadToCloud from "../libs/utils/upload-to-cloud";
import deleteLocalFile from "../libs/utils/delete-local-file";
import { validationResult } from "express-validator";
import FailureResponse from "../libs/http-response-shapes/failure.response-shape";

export const update: RequestHandler[] = [
  profileValidations.name(),
  profileValidations.bio(),

  // handle validationErrors
  (req, res, next) => {
    const validationErrors = validationResult(req);
    const localAvatarData = req.file;

    if (!validationErrors.isEmpty()) {
      const statusCode = 400;

      res.status(statusCode).json(
        new FailureResponse("Validations failed.", statusCode, {
          errors: validationErrors.mapped(),
        }),
      );

      // delete the file from diskstorage asynchronously
      if (localAvatarData && localAvatarData.path) {
        deleteLocalFile(localAvatarData.path);
      }

      return;
    }

    next();
  },

  // handle profile creation after successful validations
  async (req, res) => {
    const { name, bio } = req.body;
    let avatarUrl = "";

    if (req.file) {
      // upload to cloud
      const path = req.file.path;
      const result = await uploadToCloud(path);

      avatarUrl = result.secure_url || result.url;

      // delete local file after uploading to cloud
      deleteLocalFile(path);
    }

    const profileId = Number(req.params.id);
    const updatedProfile = await profileModel.update(
      profileId,
      name,
      bio,
      avatarUrl,
    );

    res.json(
      new SuccessResponse("Profile information updated successfully.", {
        profile: updatedProfile,
      }),
    );
  },
];
