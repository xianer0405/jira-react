import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";

export const LoggedApp = () => {
  const { logout } = useAuth();
  return (
    <>
      <button onClick={() => logout()}>退出</button>
      <ProjectListScreen />
    </>
  );
};
