import mongoose from "mongoose";
import Blog from "./model.js";
const blog1 = new Blog({
  title: "title1",
  author: "author1",
  url: "/home",
  likes: 12,
});
blog1
  .save()
  .then((result) => {
    console.log(result);
  })
  .finally(() => {
    mongoose.connection.close();
  });
