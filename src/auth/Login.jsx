import React, {useState} from 'react';
import { Input, Form, Label } from 'reactstrap';
import styled from "styled-components";
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

const InputFont = styled.div`
font-family: 'Roboto Mono', monospace;
font-size: large;
`

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({user:{username: username, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken);
            props.updateID(data.ID);
            console.log(data);
        }).catch(err => {
            alert("failed to login");
            console.log(err)
        })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                    <Label htmlFor="email">Email</Label>
                    <InputFont><Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} placeholder="Username" type="email"/></InputFont>
                    {/* <br /> */}
                    <Label htmlFor="password">Password</Label>
                    <InputFont><Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="Password" type="password"/></InputFont>
                    {/* <br /> */}
                    <ButtonContainer type="submit">Login</ButtonContainer>
                    <br />
                    <p>Don't have an account? <a href="/signup" onClick={props.switchToSignup}>Signup</a></p>

            </Form>
        </Container>
     )
}
 
export default Login;