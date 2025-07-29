import {
  BlogImage,
  Comment,
  Blog as PrismaBlog,
  Tag,
  User,
} from "../generated/prisma";
import SafeUser from "./safe-user.type";

type RawBlogExtras = {
  author: SafeUser;
  images: Partial<BlogImage>[];
  tags: Partial<Tag>[];

  _count: {
    likes: number;
    comments: number;
  };

  likes: Partial<User>[];
  comments: Partial<Comment>[];
};

type RawBlog = RawBlogExtras & Omit<PrismaBlog, "authorId">;

export default RawBlog;
