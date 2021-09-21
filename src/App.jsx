// import './App.css';
import React, {useState, useEffect} from 'react';
import Sitebar from './Components/Navbar';
import Auth from './auth/Auth';
import SightingIndex from './Components/SightingIndex';
import styled from 'styled-components';
import background from './Assets/backgroundimage4.jpg'
import WebFont from 'webfontloader'

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
  const [ID, setID] = useState('');
  const [updateSightingFeed, setUpdateSightingFeed] = useState('global');

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

  const updateID = (newID) => {
    setID(newID);
    localStorage.setItem('ID', newID);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const updateFeedMine = () => {
    setUpdateSightingFeed('mine');
    console.log(updateSightingFeed)
  }

  const updateFeedGlobal = () => {
    setUpdateSightingFeed('global');
    console.log(updateSightingFeed)
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <SightingIndex token={sessionToken} updateSightingFeed={updateSightingFeed}/> : <Auth updateToken={updateToken} updateID={updateID} />)
  };

  return (
    <BirdBackground>
    <SiteContainer>
      {localStorage.getItem('token') === sessionToken ? <Sitebar clickLogout={clearToken} updateFeedMine={updateFeedMine} updateFeedGlobal={updateFeedGlobal} />: null }
      <UserContainer>
        {protectedViews()}
      </UserContainer>
    </SiteContainer>
    </BirdBackground>
  );
}

export default App;
