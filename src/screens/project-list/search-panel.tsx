import React from "react";
import { User } from "./index";

interface SearchPanelProps {
  users: User[];
  // 内联类型
  param: {
    name: string;
    personId: string;
  };
  // 类型复用或引用
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <form action="">
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </div>
      <select
        value={param.personId}
        onChange={(evt) =>
          setParam({
            ...param,
            personId: evt.target.value,
          })
        }
      >
        <option value={""}>负责人</option>
        {users.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
