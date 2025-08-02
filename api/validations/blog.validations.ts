import { body } from "express-validator";

export const title = () => {
  const MIN_LENGTH = 5;
  const MAX_LENGTH = 120;

  return body("title")
    .isString()
    .withMessage("Title must be of type string.")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ min: MIN_LENGTH, max: MIN_LENGTH })
    .withMessage(
      `Title must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`,
    );
};

export const content = () => {
  const MIN_LENGTH = 5;
  return body("content")
    .isString()
    .withMessage("Content must be of type string.")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ min: MIN_LENGTH, max: MIN_LENGTH })
    .withMessage(`Content must be atleast ${MIN_LENGTH} characters long.`);
};

export const status = () => {
  const VALID_STATUSES = ["PUBLISHED", "DRAFT"];

  return body("status")
    .optional()
    .isAlpha()
    .withMessage("Status must be only alphabatic characters.")
    .custom((status) => {
      if (typeof status !== "string") {
        return false;
      }

      return VALID_STATUSES.includes(status);
    })
    .withMessage(`Stauts must be either ${VALID_STATUSES.join(" or ")}.`);
};

export const category = () => {
  const VALID_CATEGORIES = ["web_dev", "game_dev", "offtopic"];

  return body("category")
    .isAlpha()
    .trim()
    .notEmpty()
    .withMessage("Category is required.")
    .withMessage("Category must be only alphabatic characters.")
    .custom((category) => {
      if (typeof category !== "string") {
        return false;
      }

      return VALID_CATEGORIES.includes(category.toLowerCase());
    })
    .withMessage(`Stauts must be either ${VALID_CATEGORIES.join(" or ")}.`);
};

export const tags = () => {
  return body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array.")
    .custom((tags) => {
      if (!Array.isArray(tags)) {
        return false;
      }

      return tags.every((item) => typeof item === "string"); // retuns true if array is empty
    })
    .withMessage("Tags must be an array of strings.");
};
