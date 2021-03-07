import React, { ReactNode, useContext, useState } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list";
import { useMount } from "../utils";
import { request } from "../utils/http";

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

const initUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await request("me", { token });
    user = data.user;
  }
  return user;
};

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

  useMount(() => {
    initUser().then(setUser);
  });

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
