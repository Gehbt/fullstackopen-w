// import { mkConnect } from "~/dao/connect.js";
import { mkConnect } from "~/dao/connect.js";
import User from "./models.js";
import mongoose from "mongoose";
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
// mkConnect();

const promiseArr = userList.map(async (user) => {
  const savedUser = await new User(user).save();

  console.log("savedUser :>> ", savedUser);
});

Promise.all(promiseArr)
  .then((res) => {
    console.log("res :>> ", res);
  })
  .finally(() => {
    mongoose.connection.close();
  });
