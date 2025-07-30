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

export const createOne = async (
  email: string,
  password: string,
  name: string,
  avatarUrl?: string,
  bio?: string,
): Promise<SafeUser> => {
  const saltLength = 10;
  const passwordHash = await bcrypt.hash(password, saltLength);

  return prisma.user.create({
    data: {
      email,
      passwordHash,
      profile: {
        create: {
          name,
          // include fields only if they exist
          ...(bio ? { bio: bio.trim() } : {}),
          ...(avatarUrl ? { avatarUrl } : {}),
        },
      },
    },

    omit: {
      email: true,
      passwordHash: true,
    },

    include: {
      profile: true,
    },
  });
};
