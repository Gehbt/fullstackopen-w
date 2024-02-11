import mongoose from "mongoose";
import Note from "./models.js";
import Init_Notes from "~/db-note.json";
import { mkConnect } from "~/dao/connect.js";
mkConnect();
// 删除全部
// Note.deleteMany().then((result) => {
//   console.log("fin", result);
// });

// 初始化数据库
const promise_notes = Init_Notes.notes.map(async (note) => {
  const result = await new Note(note).save();
  console.log("note ", result.id, "add!");
});

Promise.all(promise_notes)
  .then(() => {
    Note.find({})
      .then((notes) => {
        notes.forEach((note) => {
          console.log(note);
        });
      })
      .finally(() => {
        mongoose.connection.close();
      });
  })
  .catch(console.error);

// 测试查询 id=1
// Note.findOne({ id: 1 })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

// 查询全部
// Note.find({})
//   .then((result) => {
//     result.forEach((note) => {
//       console.log(note);
//     });
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

// 删除1
// Note.deleteOne({ id: 1 })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

// 数据Schema 字段选项
//    type： 数据类型
//    min: 数值型设置最小值
//    max: 数值型设置最大值
//    minlength: 最小长度
//    maxlength 最大长度
//    required: 是否为必须字段，默认为false
//    enum: 设置字段为枚举型，字段值必须是枚举列表中的值
//    default: 设置字段的默认值
//    unique: 设置字段索引唯一
//    index: 设置字段索引
//    match：设置是否通过正则验证，RegExp设置通过正则验证
//    trim: 设置是否去除数据前后空格
//    capped: 设置字段大小
//    validate： 为字段添加一个验证器
//    set: 添加set方法用于拦截设置值，按get方法进行设置
//    get: 添加get方法用于获取值处理
