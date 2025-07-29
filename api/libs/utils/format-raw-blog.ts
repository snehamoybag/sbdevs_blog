import Blog from "../../types/blog.type";
import RawBlog from "../../types/raw-blog.type";

const formatRawBlog = (rawBlog: RawBlog): Blog => {
  // extract out values that are needed to be formatted
  const {
    createdAt,
    updatedAt,
    images,
    tags,
    _count,
    likes,
    comments,
    ...rest
  } = rawBlog;

  // format the blog data for easy parsing
  const formattedBlog: Blog = {
    date: {
      createdAt,
      updatedAt,
    },

    images: images.map((image) => image.url),

    count: {
      like: _count.likes,
      comment: _count.comments,
    },

    interactionsByUser: {
      like: likes.length > 0,
      comment: comments.length > 0,
    },

    tags: tags.map((tag) => tag.name),

    ...rest,
  };

  return formattedBlog;
};

export default formatRawBlog;
