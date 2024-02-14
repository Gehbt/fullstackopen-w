import { useState, useEffect } from "react";
import personService from "./services/persons.mjs";
import Notification from "./components/Notification.jsx";
import { setWithReset } from "./tools/index.mjs";
const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState("");
  const [errorState, setErrorState] = useState(false);
  const init = () => {
    personService.getAll().then((init) => [setPersons(init)]);
  };
  useEffect(init, []);
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
          setWithReset(setMessage, "success");
        })
        .catch((error) => {
          setWithReset(setMessage, error.response.data);
          setWithReset(setErrorState, true);
        })
        .finally(() => {
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
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setWithReset(setMessage, "success");
        })
        .finally(() => {
          setNewName("");
          setNewNumber("");
          alert("add success");
        });
    } else {
      console.log("todo? :>> ");
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
  function handleDelete(name) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete")) {
      const targetPerson = persons.find((person) => person.name === name);
      if (targetPerson) {
        console.log("targetPerson :>> ", targetPerson);
        personService
          .remove(targetPerson.id)
          .then((response) => {
            console.log("name :>> ", name);
            setPersons(
              persons.filter((person) => person.id !== targetPerson.id)
            );
          })
          .catch((err) => {
            // 本地有远端没有
            setWithReset(setErrorState, true);
            if (err.response.status === 404) {
              setWithReset(setMessage, name + "has removed!");
            } else {
              setWithReset(setMessage, "unknown error!" + err.response.status);
            }
          })
          .finally(() => {
            setPersons(
              persons.filter((person) => person.id !== targetPerson.id)
            );
          });
      }
    }
  }

  return (
    <div style={props.style}>
      <Notification message={message} isError={errorState} />
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
          <button onClick={() => handleDelete(person.name)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
