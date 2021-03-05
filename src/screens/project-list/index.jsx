import React, {useEffect, useState} from "react";
import qs from 'qs';

import {SearchPanel} from "./search-panel";
import {PrjectList} from "./list";
import {cleanObject} from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]);

    const [param, setParam] = useState({
        name: '',
        personId: ''
    });

    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async (resp) => {
            if (resp.ok) {
                setList(await resp.json());
            }
        });
    }, [param]);

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async (resp) => {
            if (resp.ok) {
                setUsers(await resp.json());
            }
        });
    }, [param]);

    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <PrjectList  list={list} users={users}/>
        </div>
    );
}
