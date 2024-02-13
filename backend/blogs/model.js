import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
  },
  url: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  users: {
    type: Number,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
