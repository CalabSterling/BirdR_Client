import React, {useState} from 'react';
import { Input, Form, Button } from 'reactstrap';
import styled from "styled-components";


const Container = styled.div`
    margin: 0;
    padding: 0;
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
        })
    }
    
    return ( 
        <Container>
            <Form onSubmit={handleSubmit}>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} placeholder="Username" type="email"/>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} placeholder="Password" type="password"/>
                    <Button type="submit">Login</Button>
                    <br />
                    <p>Don't have an account? </p><a href="#" onClick={props.switchToSignup}>Signup</a>
                            
            </Form>
        </Container>
     )
}
 
export default Login;