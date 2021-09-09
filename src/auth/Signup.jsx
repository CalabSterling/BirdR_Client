import React, { useState } from 'react';
import {Form, Input, Button, } from 'reactstrap';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/user/signup`, {
            method: 'POST',
            body: JSON.stringify({user:{username: username, password: password}}),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return ( 
        <div>
        <Form onSubmit={handleSubmit}>
            <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} type="email" placeholder="Username"/>
            <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password" placeholder="Password"/>
            <Button type="submit" >Signup</Button>
            <br />
            <a>Already a member? </a><a href="/login" onClick={props.switchToLogin}>Login</a>
        </Form>
        </div>
     );
}
 
export default Signup;