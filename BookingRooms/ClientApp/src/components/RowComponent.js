import React from 'react';

export function RowComponent(props) {
    const { data, onClick } = props;

    function handleClick() {
        onClick(data);
    }

    return (
        <tr onClick={handleClick}>
            <td data-title="Salle">{data}</td>
            <td data-title="Reserver"><button className="btn btn-primary">Reserver</button></td>
        </tr>
    );
}