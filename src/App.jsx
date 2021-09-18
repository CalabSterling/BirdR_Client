// import './App.css';
import React, {useState, useEffect} from 'react';
import Sitebar from './Components/Navbar';
import Auth from './auth/Auth';
import SightingIndex from './Components/SightingIndex';
import styled from 'styled-components';
import background from './Assets/backgroundimage4.jpg'





const BirdBackground = styled.div`
background-image: url(${background});
background-color: #719D80;
background-size: cover;
min-height: 100%;
min-width: 1024px;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
`

const SiteContainer = styled.div`
  font-family: 'Amatic SC', cursive;
  height: 100%;
  display: grid;
`;


const UserContainer = styled.div`
margin: auto;
`



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
    <BirdBackground>
    <SiteContainer>
         {sessionToken === '' ? null : <Sitebar clickLogout={clearToken}/>}
      <UserContainer>
        {protectedViews()}
      </UserContainer>
    </SiteContainer>
    </BirdBackground>
  );
}

export default App;
