import { mkConnect } from "../dao/connect.js";
import mongoose from "mongoose";

mkConnect("personApp");
const personSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Person = mongoose.model("Person", personSchema);
export default Person;
