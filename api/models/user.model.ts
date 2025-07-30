import prisma from "../configs/prisma.config";
import bcrypt from "bcryptjs";
import SafeUser from "../types/safe-user.type";

const safeUserSelects = {
  omit: { email: true, passwordHash: true },
  include: {
    profile: true,
  },
};

export const getById = (id: number): Promise<SafeUser | null> => {
  return prisma.user.findUnique({ where: { id }, ...safeUserSelects });
};

export const getByEmail = (email: string): Promise<SafeUser | null> => {
  return prisma.user.findUnique({
    where: { email },
    ...safeUserSelects,
  });
};

export const getIsPasswordMatching = async (
  email: string,
  password: string,
): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return false;
  }

  return bcrypt.compare(password, user.passwordHash);
};
