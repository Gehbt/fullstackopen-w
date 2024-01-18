import mongoose from "mongoose";
import { mkConnect } from "../dao/connect.js";

mkConnect("noteApp");
// 在建立与数据库的连接后，我们为一个笔记定义模式(schema)和匹配的模型(model)
// schema告诉Mongoose如何将笔记对象存储在数据库中。
const noteSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: { type: Boolean, default: false },
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// 建立模型类
const Note = mongoose.model("Note", noteSchema);

export default Note;
