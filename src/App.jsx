import './App.css';
import React, {useState, useEffect} from 'react';
import Auth from './auth/Auth';
import SightingIndex from './Components/SightingIndex';
import styled from 'styled-components';
import background from './Assets/backgroundimage1.jpg';
import background2 from './Assets/backgroundimage9.jpg';
import Sitebar from './Components/Navbar';




const BirdBackground = styled.div`
background-image: url(${background});
background-color: #719D80;
background-size: cover;
background-position-y: 10%;
min-height: 100%;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;

@media (max-width: 1024px) {
  background-image: url(${background2});
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

  @media (max-width: 1024px) {
    margin: auto;
  }
`

function App(props) {
  const [sessionToken, setSessionToken] = useState('');
  const [ID, setID] = useState('');
  const [updateSightingFeed, setUpdateSightingFeed] = useState('potato');
  const [navbarSight, setNavbarSight] = useState('');

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
    return (sessionToken === localStorage.getItem('token') ? <SightingIndex navbarSight={setNavbarSight} token={sessionToken} updateSightingFeed={updateSightingFeed}/> : <Auth updateToken={updateToken} updateID={updateID} />)
  };

  return (
    <BirdBackground>
    <SiteContainer>
    {/* {sessionToken === '' ? null : <SightingIndex clickLogout={clearToken}/>} */}
      {localStorage.getItem('token') === sessionToken ? <Sitebar navbarSight={navbarSight} clickLogout={clearToken} updateFeedMine={updateFeedMine} updateFeedGlobal={updateFeedGlobal} />: null }
      <UserContainer>
        {protectedViews()}
      </UserContainer>
    </SiteContainer>
    </BirdBackground>
  );
};

export default App;
