import { RequestHandler } from "express";
import * as profileModel from "../models/profile.model";
import * as profileValidations from "../validations/profile.validations";
import localUpload from "../configs/multer.config";
import SuccessResponse from "../libs/http-response-shapes/success.response-shape";
import uploadToCloud from "../libs/utils/upload-to-cloud";
import deleteLocalFile from "../libs/utils/delete-local-file";

export const update: RequestHandler[] = [
  profileValidations.name(),
  profileValidations.bio(),

  localUpload.single("avatar"),

  async (req, res) => {
    const { name, bio } = req.body;
    let avatarUrl = "";

    if (req.file) {
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
