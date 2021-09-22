import React, {useState} from 'react';
import { Input, Form, Label } from 'reactstrap';
import styled from "styled-components";

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

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/login', {
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
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} placeholder="Username" type="email"/>
                    <br />
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="Password" type="password"/>
                    <br />
                    <ButtonContainer type="submit">Login</ButtonContainer>
                    <br />
                    <p>Don't have an account? <a href="/signup" onClick={props.switchToSignup}>Signup</a></p>

            </Form>
        </Container>
     )
}
 
export default Login;