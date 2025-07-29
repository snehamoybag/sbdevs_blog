const selectBlogFields = (userId?: number) => {
  return {
    omit: {
      authorId: true,
    },

    include: {
      tags: { select: { name: true } },
      images: { select: { url: true } },

      // select blog author details
      author: {
        omit: {
          email: true,
          passwordHash: true,
        },
        include: {
          profile: true,
        },
      },

      // likes and comments count
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },

      // select user interactions with the blog
      // if userId is not provided use an id that can never exist e.g -1
      // this will make sure the query will return the field even without userId
      likes: {
        where: {
          id: userId || -1,
        },
        select: {
          id: true,
        },
      },

      comments: {
        where: {
          authorId: userId || -1,
        },
        select: {
          id: true,
        },
      },
    },
  };
};

export default selectBlogFields;
