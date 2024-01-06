import { useState } from "react";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phone-book`);
    }
    if (newName !== "" && newNumber !== "") {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
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
  return (
    <div>
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
        <h3 key={index}>
          {person.name} {person.number}
        </h3>
      ))}
    </div>
  );
};

export default App;
