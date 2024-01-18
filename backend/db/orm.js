import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

const { DB_PASSWORD, DB_NAME } = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
}).parsed;

const url = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.c9s0ico.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then((result) => {
    console.log("success connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
// 在建立与数据库的连接后，我们为一个笔记定义模式(schema)和匹配的模型(model)
// schema告诉Mongoose如何将笔记对象存储在数据库中。
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
// eslint-disable-next-line no-unused-vars
const Note = mongoose.model("Note", noteSchema);
