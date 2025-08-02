import prisma from "../configs/prisma.config";
import Blog from "../types/blog.type";
import selectBlogFields from "../libs/utils/select-blog-fields";
import formatRawBlog from "../libs/utils/format-raw-blog";
import { Category, Status } from "../generated/prisma";

export const getOne = async (
  blogId: number,
  userId?: number,
): Promise<Blog | null> => {
  const rawBlog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },

    ...selectBlogFields(userId),
  });

  if (!rawBlog) {
    return null;
  }

  const blog = formatRawBlog(rawBlog);

  return blog;
};

export const getMany = async (
  limit: number,
  offset: number,
  userId?: number,
): Promise<Blog[]> => {
  const rawBlogs = await prisma.blog.findMany({
    where: { status: "PUBLISHED" },

    take: limit,
    skip: offset,

    ...selectBlogFields(userId),
  });

  const blogs: Blog[] = rawBlogs.map((blog) => formatRawBlog(blog));
  return blogs;
};

export const create = async (
  authorId: number,
  title: string,
  content: string,
  status: Status,
  category: Category,
  images: { publicId: string; url: string }[] = [],
  tags: string[] = [],
) => {
  return prisma.blog.create({
    // creates
    data: {
      title,
      content,
      status,
      category,

      author: {
        connect: { id: authorId },
      },

      images: {
        create: images,
      },

      tags: {
        connectOrCreate: tags.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },

    // inclueds
    include: {
      images: true,
      tags: true,
    },
  });
};
