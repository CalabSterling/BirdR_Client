import './App.css';
import React, {useState, useEffect} from 'react';
import Sitebar from './Components/Navbar';
import Auth from './auth/Auth';
import SightingIndex from './Components/SightingIndex';
import styled from 'styled-components';

const UserContainer = styled.div`
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

function App(props) {
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <SightingIndex token={sessionToken}/> : <Auth updateToken={updateToken}/>)
  };

  return (
    <div>
      <UserContainer>
        {/* <Auth updateToken={updateToken}/> */}
        {protectedViews()}
      </UserContainer>
      {sessionToken === '' ? null : <Sitebar clickLogout={clearToken}/>}
    </div>
  );
}

export default App;
