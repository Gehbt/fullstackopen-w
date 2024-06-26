import mongoose from "mongoose";
import logger from "~/utils/logger.js";

logger.info("-->>/noteApp");
// 在建立与数据库的连接后，我们为一个笔记定义模式 (schema) 和匹配的模型 (model)
// schema 告诉 Mongoose 如何将笔记对象存储在数据库中。
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
    required: false,
  },
  important: { type: Boolean, default: false },
  users: {
    type: Number,
    ref: "User",
  },
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
