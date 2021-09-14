import React, { useState } from 'react';
import {Form, Input, Button, } from 'reactstrap';

const Signup = (props) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/user/signup`, {
            method: 'POST',
            body: JSON.stringify({user:{name: name, username: username, password: password, birthday: birthday}}),
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
            <Input onChange={(e) => setName(e.target.value)} name="name" value={name} type="name" placeholder="Full Name"/>
            <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} type="email" placeholder="Username"/>
            <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password" placeholder="Password"/>
            <Input onChange={(e) => setBirthday(e.target.value)} name="birthday" value={birthday} type="birthday" placeholder="Birthday YYYY-MM-DD"/>
            <Button type="submit" >Signup</Button>
            <br />
            <a>Already a member? </a><a href="/login" onClick={props.switchToLogin}>Login</a>
        </Form>
        </div>
     );
}
 
export default Signup;