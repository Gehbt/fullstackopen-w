import { Schema, model } from "mongoose";
import logger from "~/utils/logger.js";

logger.info("-->>/usersApp");
const userSchema = new Schema({
  id: Number,
  username: String,
  name: String,
  passwordHash: { type: String, required: true },
  notes: [
    {
      type: Number,
      // 代表为外键
      ref: "Note",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = model("User", userSchema);

export default User;
