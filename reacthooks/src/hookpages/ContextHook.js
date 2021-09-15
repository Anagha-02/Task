import React, { useState, createContext, useContext } from "react";
import { FormLabel } from 'react-bootstrap';

export const AppContext = createContext(null);

function Login() {
  const { setUsername } = useContext(AppContext);

  return (
    <div>
      <FormLabel> Enter name </FormLabel>
      <input onChange={(event) => { setUsername(event.target.value); }} />
    </div>
  );
}


function User() {
  const { username } = useContext(AppContext);

  return (
    <div>
      <h1>User: {username}</h1>
    </div>
  );
}


function ContextHook() {
  const [username, setUsername] = useState("");

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      <Login />
      <User />
    </AppContext.Provider>
  );
}

export default ContextHook;
