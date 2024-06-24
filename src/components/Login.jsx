import { useState } from "react";
/**
 * @param {{ handleLogin: (
 *  e: React.FormEvent<HTMLFormElement>,
 *  userData: { username: string; password: string }
 * ) => void }} props
 */

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        handleLogin(e, { username, password });
        setUsername("");
        setPassword("");
      }}
    >
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          autoComplete="Username"
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          autoComplete="off"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
export default LoginForm;
