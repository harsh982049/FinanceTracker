import React from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import {BiPowerOff} from "react-icons/bi";

function Logout()
{
    const navigate = useNavigate();

    const hancleClick = async () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <>
            <Header>Logout</Header>
            <Button onClick={hancleClick}>
                <BiPowerOff/>
            </Button>
        </>
    );
}

const Header = styled.p`
    color: black;
    font-size: 1.5rem;
    margin-right: 1rem;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #997af0; */
    /* background-color: black; */
    background-color: #59d25d;
    color: white;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: background-color 0.5s ease-in-out, box-shadow 0.1s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover
    {
        /* background-color: gray; */
        background-color: #52bf58;
    }

    &:active
    {
        background-color: #46b34c;  /* Slightly darker background */
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2); /* Smaller shadow */
        transform: translateY(1px); /* Slightly move down */
    }
`;

export default Logout;