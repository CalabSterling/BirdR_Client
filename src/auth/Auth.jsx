import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import styled from 'styled-components';

const LogoContainer = styled.div`
    font-size: 20px;
    font-family: 'Garamond';
    color: rgb(255, 251, 30);
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: 280px;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, .15);
    position: relative;
    overflow: hidden;
`;
const TopContainer = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;
const BackDrop = styled.div`
    width: 150%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(60deg);
    top: -290px;
    left: -70px;
    background: rgb(8, 150, 48);
    background: linear-gradient (
        58deg,
        rgba(8, 150, 48, 1) 20%rgba,
        #054d03 100%
    );
`;
const HeaderContainer = styled.div`
    width: 100%100%;
    display: flex;
    flex-direction: column;
`;
const HeaderText = styled.div`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.2;
    color: #fff;
    z-index: 10;
`;
const SmallText = styled.h5`
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    z-index: 10;
    margin: 0;
    margin-top: 15px;
`;
const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Auth = (props) => {
    const [active, setActive] = useState("login");
    const switchToSignup = (e) => {
        e.preventDefault();
        setActive('signup');
    }

    const switchToLogin = () => {
        setActive('login')
    }

    let hour = new Date().getHours()


    return ( 
        <Container>
            <TopContainer>
                <BackDrop />
                <HeaderContainer>
                    <HeaderText>
                        <LogoContainer>BirdR</LogoContainer>
                        {hour >= 4 && hour < 12 ? "Good Morning" : hour >= 12 && hour < 18 ? "Good Afternoon" : "Good Evening"}
                    </HeaderText> 
                    <SmallText>
                        {active === "login" ? 'Please Login' : 'Please Signup' }
                    </SmallText>
                </HeaderContainer>
            </TopContainer>
            <InnerContainer>
                {active === 'login' ? <Login switchToSignup={switchToSignup} updateToken={props.updateToken}/> : <Signup switchToLogin={switchToLogin} updateToken={props.updateToken}/>}
            </InnerContainer>
        </Container>
     );
}
 
export default Auth;