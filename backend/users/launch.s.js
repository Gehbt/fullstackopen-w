// import { mkConnect } from "~/dao/connect.js";
import { mkConnect } from "~/dao/connect.js";
import User from "./models.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
mkConnect();
const userList = [
  {
    id: 234,
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  },
  {
    id: 111,
    username: "root",
    name: "Superuser",
    password: "salainen",
  },
];

const promiseArr = userList.map(async (user) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);
  const newUser = new User(
    Object.assign(user, {
      passwordHash,
    })
  );
  const savedUser = await newUser.save();
  console.log("savedUser :>> ", savedUser);
});

Promise.all(promiseArr)
  .then((res) => {
    console.log("res :>> ", res);
  })
  .finally(() => {
    mongoose.connection.close();
  });
