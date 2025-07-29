import { Blog as PrismaBlog } from "../generated/prisma";
import SafeUser from "./safe-user.type";

type BlogExtras = {
  author: SafeUser;
  images: string[];
  tags: string[];

  date: {
    createdAt: Date;
    updatedAt: Date;
  };

  count: {
    like: number;
    comment: number;
  };

  interactionsByUser: {
    like: boolean;
    comment: boolean;
  };
};

type Blog = BlogExtras &
  Omit<PrismaBlog, "updatedAt" | "createdAt" | "authorId">;

export default Blog;
