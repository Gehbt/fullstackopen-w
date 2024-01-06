import { useState, useEffect } from "react";
import personService from "./services/persons";
const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const hook = () => {
    personService.getAll().then((init) => [setPersons(init)]);
  };
  useEffect(hook, []);
  const addPerson = (event) => {
    event.preventDefault();
    // change the name/number
    if (persons.find((person) => person.name === newName)) {
      // alert(`${newName} is already added to phone-book`);
      const t_person = persons.find((person) => person.name === newName);
      const changedPerson = {
        ...t_person,
        number: newNumber,
      };
      personService
        .update(t_person.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : changedPerson
            )
          );
          setNewName("");
          setNewNumber("");
        });
      alert("change success");
    } else if (newName !== "" && newNumber !== "") {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
      alert("add success");
    }
  };
  const personToSearch =
    searchName === ""
      ? persons
      : persons.filter((persons) => persons.name.startsWith(searchName));
  function handleSearchChange(event) {
    console.log(event.target.value);
    setSearchName(event.target.value);
  }
  function handleNameChange(event) {
    console.log(event.target.value);
    setNewName(event.target.value);
  }
  function handleNumberChange(event) {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }
  function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete")) {
      const targetPerson = persons.find((person) => person.id === id);
      console.log("targetPerson :>> ", targetPerson);
      personService.remove(targetPerson.id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  }

  return (
    <div style={props.style}>
      <h2>Phonebook</h2>
      <span>
        filter name <input value={searchName} onChange={handleSearchChange} />
      </span>
      <hr />
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personToSearch.map((person, index) => (
        <div key={index}>
          <h3>
            {person.name} {person.number}
          </h3>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;