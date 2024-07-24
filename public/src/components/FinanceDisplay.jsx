import React, {useState, useEffect, useMemo} from 'react';
import styled from "styled-components";
import axios from "axios";
import {getAllRecordsRoute, updateRecordRoute, deleteRecordRoute} from '../utils/APIroutes';
import Table from './Table';

function FinanceDisplay({currentUserId, changeInRecord})
{
    const columns = useMemo(() => [
        {Header: "Description", accessor: "description"},
        {Header: "Amount", accessor: "amount"},
        {Header: "Category", accessor: "category"},
        {Header: "Payment Method", accessor: "paymentMethod"},
        {Header: "Date", accessor: "date"},
        {Header: "Delete", accessor: "delete"},
    ]);

    const [financeRecords, setFinanceRecords] = useState([]);
    const [sortOptions, setSortOptions] = useState({
        sortBy: "select a field",
        order: "ascending"
    });
    const [monthlyCost, setMonthlyCost] = useState(null);

    const handleOptionChange = (event) => {
        const {name, value} = event.target;
        console.log(name, value);
        if(value === 'paymentMethod')
        {
            setSortOptions({...sortOptions, [name]: "paymentMethod"});
            return;
        }
        setSortOptions({...sortOptions, [name]: value.toLowerCase()});
    };

    const handleDeleteRecord = async (event, rowIndex) => {
        const {recordId} = financeRecords[rowIndex];
        const record = await axios.delete(`${deleteRecordRoute}/${recordId}`);
        changeInRecord();
    };

    const updateFinancialRecords = async (rowIndex, columnId, value) => {
        const {recordId} = financeRecords[rowIndex];
        const record = await axios.patch(`${updateRecordRoute}/${recordId}`, {[columnId]: value});

        setFinanceRecords(old => old.map((row, index) => {
            if(index === rowIndex)
            {
                return {
                    ...old[rowIndex],
                    [columnId]: value,
                };
            }
            return row;
          })
        );
    };

    useEffect(() => {
        const getRecords = async () => {
            let totalCost = 0;
            let url = `${getAllRecordsRoute}/${currentUserId}?sort=`;
            // url += '?sort=';
            if(sortOptions.sortBy !== 'select a field')
            {
                if(sortOptions.order === 'ascending')
                {
                    url += `${sortOptions.sortBy}`;
                }
                else
                {
                    url += `-${sortOptions.sortBy}`;
                }
            }
            else
            {
                if(sortOptions.order === 'ascending') url += 'createdAt';
                else url += '-createdAt'
            }
            const {data: {records}} = await axios(url);
            const recordsArray = [];
            records.forEach((record) => {
                const recordObject = {
                    description: record.description,
                    amount: record.amount,
                    category: record.category,
                    paymentMethod: record.paymentMethod,
                    date: record.createdAt,
                    recordId: record._id
                };
                recordsArray.push(recordObject);
                totalCost += recordObject.amount;
            })
            setFinanceRecords(recordsArray);
            setMonthlyCost(totalCost);
        };
        if(currentUserId)
        {
            getRecords();
        }
    }, [currentUserId, changeInRecord, sortOptions]);

    return (
        <Container>
            {financeRecords && <>
                <p className='cost'>Total Monthly: Rs. {monthlyCost}</p>
                <div className="sort-options">
                    <span>Sort Table By: </span>
                    <select name="sortBy" value={sortOptions.sortBy} onChange={handleOptionChange}>
                        <option value="select a field">Select a Field</option>
                        <option value="description">Description</option>
                        <option value="amount">Amount</option>
                        <option value="category">Category</option>
                        <option value="paymentMethod">Payment Method</option>
                    </select>
                    <select name="order" value={sortOptions.order} onChange={handleOptionChange}>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
                <Table
                columns={columns}
                data={financeRecords}
                updateMyData={updateFinancialRecords}
                deleteRecord={handleDeleteRecord}
                />
            </>}
            
        </Container>
    );
}

const Container = styled.div`
    height: auto;
    /* height: 75vh; */
    width: 75vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .cost
    {
        font-size: 1.3rem;
        font-weight: bold;
        align-self: flex-start;
        padding: 1rem 0;
    }
    /* background-color: green; */
    .sort-options
    {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1rem 0;
        gap: 2rem;
        /* background-color: red; */
        span
        {
            font-size: 1.2rem;
            font-weight: bold;
        }
        select
        {
            width: 12%;
            padding: 0.5rem;
            justify-self: flex-start;
            &:focus
            {
                outline: none;
            }
        }
    }
`;

export default FinanceDisplay;