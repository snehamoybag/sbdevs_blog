import prisma from "../configs/prisma.config";

// throws prisma error when where clause doesn't match any row
export const update = async (
  profileId: number,
  name?: string,
  bio?: string,
  avatarUrl?: string,
) => {
  return prisma.profile.update({
    where: { id: profileId },
    data: {
      ...(name ? { name } : {}),
      ...(bio ? { bio } : {}),
      ...(avatarUrl ? { avatarUrl } : {}),
    },
  });
};
