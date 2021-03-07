import React, { ReactNode, useContext, useState } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list";

export interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

// const initUser = () => window.localStorage.getItem()

export const AuthProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => {
    return auth.login(form).then(setUser);
  };

  const register = (form: AuthForm) => {
    return auth.register(form).then(setUser);
  };

  const logout = () => {
    return auth.logout().then(() => setUser(null));
  };
  const passedAuthCtx = {
    user,
    login,
    register,
    logout,
  };
  return (
    <AuthContext.Provider value={passedAuthCtx} children={props.children} />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }

  return context;
};
