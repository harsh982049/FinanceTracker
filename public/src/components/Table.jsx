import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTable} from 'react-table';

const EditableCell = ({value: initialValue, row: {index}, column: {id}, updateMyData, deleteRecord}) => {
    const [value, setValue] = useState(initialValue);

    const onChange = e => {
        // if(id === 'date') return;
        // console.log(id);
        setValue(e.target.value);
    };

    const onBlur = () => {
        updateMyData(index, id, value);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue])

    if(id === 'delete') return <Button onClick={(e) => deleteRecord(e, index)}>Delete</Button>
    else if(id === 'date' || id === 'category' || id === 'paymentMethod') return <p>{value}</p>
    return <input value={value} onChange={onChange} onBlur={onBlur}/>
};

const defaultColumn = {
    Cell: EditableCell
};

function Table({columns, data, updateMyData, deleteRecord})
{
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data, defaultColumn, updateMyData, deleteRecord});

    return (
        <Container>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        // console.log(row.index);
                        prepareRow(row);
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    )
}

const Button = styled.button`
    background-color: #318cd6;
    color: white;
    /* padding: 0.4rem; */
    font-weight: bold;
    padding: 0.7rem;
    /* margin-top: 0.7rem; */
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
    /* &:hover
    {
        background-color: #2977b6;
    } */
    &:active
    {
        transform: translateY(2px);
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.2);
    }
`;

const Container = styled.div`
    width: 100%;
    /* font-size: 2rem; */
    input
    {
        width: 100%;
        font-size: 1rem;
        border: none;
        background-color: transparent;
        margin: 0.3rem;
        &:focus
        {
            background-color: black;
            color: white;
            /* border: 1px solid black; */
        }
    }

    table
    {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    table td, table th
    {
        border: 1px solid #ddd;
        padding: 8px;
    }

    table tr:nth-child(even)
    {
        background-color: #f2f2f2;
    }

    table tr:hover
    {
        background-color: #d7f9fd;
        /* background-color: #ddd; */
    }

    table th
    {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #318cd6;
        color: white;
    }
`;

export default Table;