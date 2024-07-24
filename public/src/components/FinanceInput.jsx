import React, {useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addRecordRoute} from '../utils/APIroutes';

const categories = ['Select a Category', 'Food', 'Rent', 'Salary', 'Utilities', 'Entertainment', 'Other'];
const paymentMethods = ['Select a Payment Method', 'Credit Card', 'Cash', 'Bank Transfer'];

const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark"
};

function FinanceInput({currentUserId, addTableRecord})
{
    const [finance, setFinance] = useState({
        description: "",
        amount: "",
        category: "Select a Category",
        paymentMethod: "Select a Payment Method",
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFinance({...finance, [name]: value});
    };

    const addRecord = async () => {
        if(checkRecordFields())
        {
            const {description, amount, category, paymentMethod} = finance;
            const {data} = await axios.post(addRecordRoute, {
                description, amount, category, paymentMethod, userId: currentUserId
            });
            if(data.status)
            {
                addTableRecord();
                setFinance({description: "", amount: "", category: "Select a Category", paymentMethod: "Select a Payment Method"});
            }
            else
            {
                toast.error(`${data.msg}`, toastOptions);
            }
        }
    };

    function checkRecordFields()
    {
        if(!finance.description || !finance.amount)
        {
            toast.error('Description and Amount fields are mandatory', toastOptions);
            return false;
        }
        else if(finance.category === categories[0] || finance.paymentMethod === paymentMethods[0])
        {
            toast.error('Please select Category and Payment Method', toastOptions);
            return false;
        }
        return true;
    }

    const categoryOptions = categories.map((category, index) => {
        return <option key={index}>{category}</option>
    });

    const paymentOptions = paymentMethods.map((method, index) => {
        return <option key={index}>{method}</option>
    });

    return (
        <>
            <Container>
                <p>Description:</p>
                <input type="text" value={finance.description} onChange={(e) => handleChange(e)} name="description"/>

                <p>Amount:</p>
                <input type="number" value={finance.amount} onChange={(e) => handleChange(e)} name="amount"/>

                <p>Category:</p>
                <select name="category" value={finance.category} onChange={(e) => handleChange(e)}>
                    {categoryOptions}
                </select>

                <p>Payment Method:</p>
                <select name="paymentMethod" value={finance.paymentMethod} onChange={(e) => handleChange(e)}>
                    {paymentOptions}
                </select>
                {/* <br/> */}
                <button onClick={addRecord}>Add Record</button>
            </Container>
            <ToastContainer/>
        </>
    );
}

const Container = styled.div`
    height: auto;
    /* height: 75vh; */
    width: 75vw;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    /* background-color: red; */
    p
    {
        font-weight: bolder;
    }
    /* input
    {
        border: 1px solid lightgray;
    } */
    input, select
    {
        border: 2px solid lightgray;
        color: steelblue;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.7rem;
        border-radius: 0.5rem;
        &:focus
        {
            outline: none;
        }
    }
    select
    {
        cursor: pointer;
        option
        {
            background-color: #777373;
            color: white;
            &:hover
            {
                background-color: #81cdff;
            }
        }
    }
    button
    {
        width: 12%;
        background-color: #318cd6;
        color: white;
        font-size: 1rem;
        font-weight: bold;
        padding: 0.7rem;
        margin-top: 0.7rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
        &:hover
        {
            background-color: #2977b6;
        }
        &:active
        {
            transform: translateY(2px);
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.2);
        }
    }
`;

export default FinanceInput;