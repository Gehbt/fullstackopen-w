import User from "~/users/models.js";
import bcrypt from "bcrypt";
import express from "express";
import Note from "~/notes/models.js";
const usersRouter = express.Router();

usersRouter.get("/", async (request, response, next) => {
  try {
    // Mongoose 的连表查询
    const users = await User.find({})
      // !只能对应ObjectId类型的外键起作用(目前为止)!
      // populate方法给予populate方法的参数定义了ids
      //   引用note对象在user文档的notes字段将被引用的note文档替换。
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
