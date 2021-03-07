import React, { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";

export const UnLoggedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const switchRegister = () => setIsRegister(!isRegister);
  return (
    <>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <a href={"#"} onClick={switchRegister}>
        {isRegister ? "已有账号，请登录" : "还没账号，请注册"}
      </a>
    </>
  );
};
