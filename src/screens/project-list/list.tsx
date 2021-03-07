import React from "react";
import { User, Project } from "./index";

interface ProjectListProps {
  list: Project[];
  users: User[];
}

export const PrjectList = ({ list, users }: ProjectListProps) => {
  const currentUser = (personId: number) => {
    return users.find((u) => u.id === personId);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{currentUser(item.personId)?.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
