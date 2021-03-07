import { User } from "./screens/project-list";

const localAuthKey = "__local_auth_key__";

export const getToken = () => window.localStorage.getItem(localAuthKey);

const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localAuthKey, user.token || "");
  return user;
};

const apiUrl = process.env.REACT_APP_API_URL;
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResponse(await resp.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      // 返回的result是any类型，所以可以传递给handleUserResponse函数
      const result = await resp.json();
      return handleUserResponse(result);
    } else {
      return Promise.reject(data);
    }
  });
};

export const logout = async () => window.localStorage.removeItem(localAuthKey);
