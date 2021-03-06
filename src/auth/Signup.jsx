import React, { useState } from 'react';
import {Form, Input, Label, } from 'reactstrap';
import styled from 'styled-components';
import APIURL from '../helpers/environment';

const Container = styled.div`
    margin: 0;
    padding: 0;
    font-size: 14px;
`;

const ButtonContainer = styled.button`
    width: 100%;
    color: #fff;
    font-size: 22px;
    border: none;
    background-color: #677487;
    border-radius: 4px;

    @media (max-width: 1024px) {
        background-color: black;
    }
`;

const MemberP = styled.p`
    padding-top: 5%;
`
;

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/user/signup`, {
            method: 'POST',
            body: JSON.stringify({user:{username: username, password: password, firstName: firstName, lastName: lastName, birthday: birthday}}),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
            props.updateID(data.ID)
            console.log(data.sessionToken)
        })
    }

    return ( 
        <Container>
        <Form onSubmit={handleSubmit}>
        <Label htmlFor="firstName">First Name</Label>
            <Input onChange={(e) => setFirstName(e.target.value)} name="firstName" value={firstName} type="text" placeholder="First Name"/>
            <br />
            <Label htmlFor="lastName">Last Name</Label>
            <Input onChange={(e) => setLastName(e.target.value)} name="lastName" value={lastName} type="text" placeholder="Last Name"/>
            <br />
            <Label htmlFor="birthday">Birthday</Label>
            <Input onChange={(e) => setBirthday(e.target.value)} name="birthday" value={birthday} type="date" placeholder="Birthday"/>
            <br />
            <Label htmlFor="email">Email</Label>
            <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} type="email" placeholder="Username"/>
            <br />
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password" placeholder="Password" pattern="[A-Za-z]{8}" required title="8 characters minimum"/>
            <br />
            <ButtonContainer type="submit" >Signup</ButtonContainer>
            <br />
            <MemberP>Already a member? <a href="/login" onClick={props.switchToLogin}>Login</a></MemberP>
        </Form>
        </Container>
     );
}
 
export default Signup;