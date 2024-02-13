import mongoose from "mongoose";
import Blog from "./model.js";
import { mkConnect } from "~/dao/connect.js";
mkConnect();
const blog1 = new Blog({
  title: "JS is hard",
  author: "root2",
  url: "/js",
  likes: 121,
});
// blog1
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });
Blog.findOne({ url: "/js" })
  .then((result) => {
    console.log(result);
  })
  .finally(() => {
    mongoose.connection.close();
  });
