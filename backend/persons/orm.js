import mongoose from "mongoose";
import Person from "./models.js";
import Init_Persons from "~/db-person.json";

const promise_persons = Init_Persons.persons.map(async (person) => {
  const result = await new Person(person).save();
  console.log("person ", result.id, "add!");
});

Promise.all(promise_persons)
  .then(() => {
    Person.find({})
      .then((persons) => {
        persons.forEach((person) => {
          console.log(person);
        });
      })
      .finally(() => {
        mongoose.connection.close();
      });
  })
  .catch(console.error);
