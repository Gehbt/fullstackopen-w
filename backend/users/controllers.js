import User from "~/users/models.js";
import bcrypt from "bcrypt";
import express from "express";
import Note from "~/notes/models.js";
const usersRouter = express.Router();

usersRouter.get("/", async (request, response, next) => {
  try {
    // Mongoose 的连表查询
    const users = await User.find({})
      // ! 只能对应 ObjectId 类型的外键起作用 (目前为止)!
      // populate 方法给予 populate 方法的参数定义了 ids
      //   引用 note 对象在 user 文档的 notes 字段将被引用的 note 文档替换。
      .populate("notes", {}, Note);
    response.json(users);
  } catch (err) {
    console.log("err :>> ", err);
    next(err);
  }
});

usersRouter.post("/", async (request, response) => {
  const { id, username, name, password } = request.body;
  // 查找重复字段
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    id,
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default usersRouter;
