import mongoose from "mongoose";
import env from "~/utils/env.js";

const { DB_PASSWORD, DB_NAME } = env;

const url = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.c9s0ico.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then((result) => {
    console.log("success connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
// 在建立与数据库的连接后，我们为一个笔记定义模式 (schema) 和匹配的模型 (model)
// schema 告诉 Mongoose 如何将笔记对象存储在数据库中。
const noteSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  content: String,
  date: Date,
  important: Boolean,
});
// 建立模型类
const Note = mongoose.model("Note", noteSchema);
