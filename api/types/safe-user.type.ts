import {
  User as PrismaUser,
  Profile as PrismaProfile,
} from "../generated/prisma";

type SafeUser = Omit<PrismaUser, "email" | "passwordHash"> & {
  // WARNNING!: profile can never be null
  // to prevent typescript error we had to use null
  profile: PrismaProfile | null;
};

export default SafeUser;
