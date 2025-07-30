import { body } from "express-validator";
import { getByEmail as getUserByEmail } from "../models/user.model";
import { Role } from "../generated/prisma";

export const newEmail = () => {
  return body("email")
    .isEmail()
    .withMessage("Invalid email type.")
    .custom(async (email) => {
      const userWithEmail = await getUserByEmail(email);

      if (userWithEmail) {
        throw new Error("Email already exists.");
      }

      return true;
    });
};

export const password = () => {
  const MIN_LENGTH = 6;
  const MAX_LENGTH = 32;

  return body("password")
    .isString()
    .withMessage("Password must be of type string.")
    .isLength({ min: MIN_LENGTH, max: MAX_LENGTH })
    .withMessage(
      `Password must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`,
    );
};

export const role = () => {
  return body("role")
    .custom((role) => {
      const validRoles: Set<Role> = new Set(["USER", "ADMIN", "MODERATOR"]);

      return validRoles.has(role);
    })
    .withMessage(
      "User role must be only one of these, 'USER', 'MODERATOR', 'ADMIN'",
    );
};

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
