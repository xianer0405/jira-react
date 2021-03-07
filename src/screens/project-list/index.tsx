import React, { useEffect, useState } from "react";
import qs from "qs";

import { SearchPanel } from "./search-panel";
import { PrjectList } from "./list";
import { cleanObject, useDebounce, useMount } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  name: string;
  id: number;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

export const ProjectListScreen = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 400);

  const [list, setList] = useState<Project[]>([]);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (resp) => {
      if (resp.ok) {
        setList(await resp.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (resp) => {
      if (resp.ok) {
        setUsers(await resp.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <PrjectList users={users} list={list} />
    </div>
  );
};
