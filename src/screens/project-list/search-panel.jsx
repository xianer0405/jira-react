import React from "react";

export const SearchPanel = (props) => {
    const { param, setParam, users } = props;

    return (
        <form action="">
            <div>
                <input type="text" value={param.name} onChange={evt => setParam({
                    ...param,
                    name: evt.target.value
                })}/>
            </div>
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option value={''}>负责人</option>
                {
                    users.map(user => {
                        return <option key={user.id} value={user.id}>{user.name}</option>
                    })
                }
            </select>
        </form>
    );
}
