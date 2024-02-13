import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "./models.js";
import env from "~/utils/env.js";
const { SECRET } = env;

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });
    console.log("user :>> ", user);
    const passwordCorrect =
      user === null
        ? false
        : // 加密后比较
          await bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET, {
      expiresIn: 60 * 60 /* 1hour */,
    });

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (err) {
    console.log("err :>> ", err);
  }
});

export default loginRouter;
