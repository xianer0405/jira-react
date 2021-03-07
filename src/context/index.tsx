import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProviders = (props: { children: ReactNode }) => {
  const { children } = props;
  return <AuthProvider>{children}</AuthProvider>;
};
