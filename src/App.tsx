import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { LoggedApp } from "./logged-app";
import { UnLoggedApp } from "./unlogged-app";

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <LoggedApp /> : <UnLoggedApp />}</div>;
}

export default App;
