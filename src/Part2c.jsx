/* v8 ignore next 60 */
// @ts-nocheck
import { useState, useEffect } from "react";
import axios from "axios";

const App = ({ style }) => {
  const [query, setQuery] = useState("");
  const [res, setRes] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    console.log("effect");

    const eventHandler = (response) => {
      console.log("promise fulfilled");
      if (response.data.length > 10) {
        console.log("to many :>> ");
        // setMsg("to many");
        setRes([]);
        return;
      } else if (response.data.length === 1) {
        setMsg(response.data[0].flags.svg);
        // const promise = axios.get(response.data[0].flags.png);
        // promise
        //   .then((res2) => setMsg(res2.data))
        //   .catch((err) => {
        //     console.error(err);
        //   });
        setRes(response.data);
      } else {
        setMsg("");
        setRes(response.data);
      }
    };
    if (query) {
      const promise = axios.get(`https://restcountries.com/v3.1/name/${query}`);
      promise.then(eventHandler).catch((err) => {
        console.error("Part2c", err);
      });
    }
  }, [query]);
  function handleChange(e) {
    setQuery(e.target.value);
  }
  return (
    <div style={style}>
      <h1>query</h1>
      <input value={query} onChange={handleChange} />
      <ul>
        {res.map((country, index) => {
          console.log("object :>> ", country.name);
          return <li key={index}>{country.name.common}</li>;
        })}
      </ul>
      {msg === "" ? "" : <img src={msg} alt="msg" />}
    </div>
  );
};

export default App;
