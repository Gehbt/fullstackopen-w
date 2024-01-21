export const dummy = (blogs) => {
  return 1;
};
/** @param {any[]} blogs  */
export const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};
/** @param {any[]} blogs  */
export const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const maxLike = likes.reduce((like, cur) => (like > cur ? like : cur), 0);
  return blogs.find((blog) => blog.likes === maxLike);
};

// mostBlogs 统计全部blog数
// mostLikes 统计全部like
