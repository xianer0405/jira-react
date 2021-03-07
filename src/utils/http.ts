import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface RequestOption extends RequestInit {
  token?: string | undefined;
  data?: object;
}

export const request = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: RequestOption = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": token ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  const url = `${apiUrl}/${endpoint}`;
  // 当状态码400或500系列是，fetch不是reject状态，需要根据response.ok判断， 只有当断网时才会是reject状态
  return window.fetch(url, config).then(async (response) => {
    if (response.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "未登录或登录已过期，请重新登录" });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      // 必须手动reject， 因为then会返回一个新的promise
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof request>) => {
    return request(endpoint, { ...config, token: user?.token });
  };
};
