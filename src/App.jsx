// import './App.css';
import React, {useState, useEffect} from 'react';
import Sitebar from './Components/Navbar'
import Auth from './auth/Auth';
import SightingIndex from './Components/SightingIndex';
import styled from 'styled-components';
import background from './Assets/backgroundimage1.jpg';
import background2 from './Assets/backgroundimage9.jpg'
import { Button } from 'reactstrap';




const BirdBackground = styled.div`
background-image: url(${background});
background-color: #719D80;
background-size: cover;
/* background-repeat: no-repeat; */
background-position-y: 10%;
min-height: 100%;
/* min-width: 1024px; */
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
/* padding-top: 1%; */

@media (max-width: 1024px) {
  background-image: url(${background2});
  /* background-position-y: bottom; */
  /* background-size: contain; */
}
`

const SiteContainer = styled.div`
  font-family: 'Amatic SC', cursive;
  height: 100%;
  display: grid;
`;


const UserContainer = styled.div`
  
  padding-top: 0%;
  padding-right: 1%;
  
  /* margin-left: 75%; */

  @media (max-width: 1024px) {
    margin: auto;
    /* padding-left: 5%; */
    /* margin-left: 10%; */
  }
/* margin-top: 3%; */
`


function App(props) {
  const [sessionToken, setSessionToken] = useState('');
  
  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, []);

 

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
