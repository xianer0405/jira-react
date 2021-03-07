import React, { useEffect, useState } from "react";
import qs from "qs";

import { SearchPanel } from "./search-panel";
import { PrjectList } from "./list";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { request, useHttp } from "../../utils/http";
import { useAuth } from "../../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  name: string;
  id: number;
  email: string;
  organization: string;
  token: string;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

export const ProjectListScreen = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  // NOTE 泛型机制，运行前就能识别类型相关的问题， typeof, toString方式都是运行时的类型判断
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 400);

  const [list, setList] = useState<Project[]>([]);
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <PrjectList users={users} list={list} />
      {/*{*/}
      {/*  value.length ? value.map(v => {*/}
      {/*    return <>*/}
      {/*      <div>{v.name}</div>*/}
      {/*    </>*/}
      {/*  }) : <div>no user</div>*/}
      {/*}*/}
      {/*<button onClick={addUser}>add</button>*/}
      {/*<button onClick={() => removeIndex(0)}>remove 0</button>*/}
      {/*<button onClick={clear}>clear</button>*/}
    </div>
  );
};
