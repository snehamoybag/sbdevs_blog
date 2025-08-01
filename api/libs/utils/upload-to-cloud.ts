import { UploadApiOptions } from "cloudinary";
import cloudinary from "../../configs/cloudinary.config";

const defaultOptions: UploadApiOptions = {
  use_filename: true, // enable only if filename is already unique
  overwrite: true,
};

const uploadToCloud = async (
  filePath: string,
  options: UploadApiOptions = defaultOptions,
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Failed to upload file to cloud.");
  }
};

export default uploadToCloud;
