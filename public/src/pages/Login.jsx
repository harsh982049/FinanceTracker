import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import styled from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrackerLogo from "../assets/TrackerLogo.svg";
import {loginRoute} from '../utils/APIroutes';

const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark"
};

function Login()
{
    const navigate = useNavigate();
    const [credentials, setCredentials] = React.useState({
        username: "",
        password: ""
    });

    useEffect(() => {
        if(localStorage.getItem('tracker-user'))
        {
            navigate('/');
        }
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation())
        {
            const {username, password} = credentials;
            console.log(username, password);
            const {data} = await axios.post(loginRoute, {username, password});
            if(data.status)
            {
                localStorage.setItem('tracker-user', JSON.stringify(data.user));
                navigate('/');
            }
            else
            {
                toast.error(`${data.msg}`, toastOptions);
            }
        }
    };

    function handleValidation()
    {
        const {username, password} = credentials;
        if(!username || !password)
        {
            toast.error('Username and Password are required', toastOptions);
            return false;
        }
        return true;
    }

    return (
        <>
            <Container>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="header">
                        <img src={TrackerLogo} alt="Tracker Logo"/>
                        <p>Finance Tracker</p>
                    </div>
                    <input
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={credentials.username}
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={credentials.password}
                        onChange={(e) => handleChange(e)}
                    />
                    <button type='submit'>Login</button>
                    <span>Don't have an account? <Link to='/register'>Register</Link></span>
                </form>
            </Container>
            <ToastContainer/>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: #131324;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        background-color: #3dc5a3;
        /* background-color: #3aec3a; */
        border-radius: 2rem;
        padding: 3rem 5rem;
        input
        {
            color: white;
            font-size: 1rem;
            background-color: black;
            width: 70%;
            padding: 1rem;
            border-radius: 0.5rem;
            /* border: 0.1rem solid #7504ff; */
            &:focus
            {
                border: 0.1rem solid yellow;
                outline: none;
            }
        }
        button
        {
            width: 70%;
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1.3rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover
            {
                background-color: #4e0eff;
            }
        }
        span
        {
            font-size: 1.4rem;
        }
    }

    .header
    {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        p
        {
            font-size: 3.5rem;
        }
        img
        {
            width: 5rem;
        }
    }
`;

export default Login;