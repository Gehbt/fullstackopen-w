import { mkConnect } from "../dao/connect.js";
import mongoose from "mongoose";
const reg_phone = /^(?:(?:\d{2,3}-)?\d{8}|^(?:\d{4}-)?\d{6,9})(?:-\d+)?$/;
mkConnect("personApp");
const personSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Person name required"],
  },
  number: {
    type: String,
    validator: {
      validator: function (v) {
        return reg_phone.test();
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Person phone number required"],
  },
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
