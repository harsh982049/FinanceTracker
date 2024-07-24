import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import FinanceInput from '../components/FinanceInput';
import FinanceDisplay from '../components/FinanceDisplay';
import Logout from '../components/Logout';

function FinanceTracker()
{
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [currentUserName, setCurrentUserName] = useState("user");
    const [recordChanged, setRecordChanged] = useState(false);

    const handleRecordChanged = () => {
        console.log("Row changed successfully");
        setRecordChanged(prev => !prev);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('tracker-user'));
        if(!user)
        {
            navigate('/login');
        }
        else
        {
            setCurrentUser(user);
            setCurrentUserName(user.username);
        }
    }, []);

    return (
        <>
            {currentUser && 
            <Container>
                <Dashboard>
                    {/* <h1>Dashboard</h1> */}
                    <Logout/>
                </Dashboard>
                <Header>
                    <p className='intro'>Welcome {currentUserName[0].toUpperCase() + currentUserName.slice(1)}! Here Are Your Finances:</p>
                </Header>
                <Content>
                    <FormInput>
                        <FinanceInput currentUserId={currentUser._id} addTableRecord={handleRecordChanged}/>
                    </FormInput>
                    <FinanceDisplayContainer>
                        <FinanceDisplay currentUserId={currentUser._id} changeInRecord={handleRecordChanged}/>
                    </FinanceDisplayContainer>
                </Content>
            </Container>
            }
        </>
    );
}

const Dashboard = styled.div`
    width: 100%;
    padding: 1rem;
    background-color: #007bff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: white;
    h1
    {
        margin: 0;
        font-size: 1.5rem;
    }
`;

const Header = styled.div`
    width: 100%;
    padding: 2rem;
    text-align: center;
    .intro
    {
        font-size: 3.7rem;
        font-weight: bold;
        margin: 0;
    }
`;

const Content = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
`;

const FormInput = styled.div`
    width: 100%;
    margin-bottom: 1rem;
`;

const FinanceDisplayContainer = styled.div`
    width: 100%;
`;

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
`;

export default FinanceTracker;
