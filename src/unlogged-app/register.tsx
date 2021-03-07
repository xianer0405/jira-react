import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";

export const RegisterScreen = () => {
  const { register } = useAuth();

  // 鸭子类型， 面相接口编程， 而不是面向对象编程
  // FormtEvent支持泛型， 泛型支持默认类型
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    // const confirmPassword = (evt.currentTarget.elements[2] as HTMLInputElement).value;
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>{"请注册"}</div>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <div>
        <label htmlFor="confirmPassword">确认密码</label>
        <input type="password" id={"confirmPassword"} />
      </div>
      <button type={"submit"}>注册</button>
    </form>
  );
};
