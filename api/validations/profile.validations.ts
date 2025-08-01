import { body } from "express-validator";

export const name = () => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 70;

  return body("name")
    .isString()
    .withMessage("Name must be of type string.")
    .trim()
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(
      `Name must be between ${MAX_LENGTH} and ${MAX_LENGTH} characters.`,
    );
};

export const bio = () => {
  const MIN_LENGTH = 15;
  const MAX_LENGTH = 255;

  return body("bio")
    .optional()
    .isString()
    .withMessage("Bio must of type string.")
    .trim()
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(
      `Bio must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`,
    );
};
