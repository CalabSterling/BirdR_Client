import React, {useState, useEffect } from 'react';
import { Container, Nav, NavItem, NavLink, Row, Col, CardDeck, CardColumns } from 'reactstrap';
import SightingCreate from './SightingCreate';
import SightingCards from './SightingCards';
import SightingEdit from './SightingEdit';
import WeatherParent from './WeatherParent';
import styled from 'styled-components';
// import newBackground from '../Assets/backgroundimage4.jpg';

const NewBackground = styled.body`
    background-color: lightblue;
    height: 100%;
    width: 100vw;
    margin-top: 0px;
    /* padding-top: 0%; */
`;

const IndexDiv = styled.div`
    margin-top: 0%;
    padding-top: 0%;

`;

const Sidebar = styled.div`
    margin-top: 3%;
    /* position: fixed; */
    z-index: 99;
`;


const SightingIndex = (props) => {
    const [sightings, setSightings] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [sightingToUpdate, setSightingToUpdate] = useState({});
    const [position, setPosition] = useState({ lat: 0, lon: 0 });
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success => {
          var lat = success.coords.latitude;
          var lon = success.coords.longitude;
          console.log(lon, lat)
          setPosition({ lat: lat, lon: lon })
        })
      }, []);

    const fetchSightings = () => {
        fetch('http://localhost:3000/sighting', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then( (res) => res.json())
        .then((sightingData) => {
            setSightings(sightingData)
           // console.log(sightingData);
        })
    }

  const editUpdateSighting = (sighting) => {
    setSightingToUpdate(sighting);
    console.log(sighting);
     }

    const updateOn = () => {
        setUpdateActive(true);
     }

    const updateOff = () => {
         setUpdateActive(false);
     }

    useEffect(() => {
        fetchSightings();
    }, [])

    return(
        <IndexDiv>
        <NewBackground>
            
        <Container>
        <Row>
                <Col md="4">  
            <Sidebar>
            <Nav vertical>
                <NavItem>
                    <NavLink href="#">BirdR</NavLink>
                </NavItem>
                <NavItem>
                    <SightingCreate fetchSightings={fetchSightings} token={props.token}/>
                </NavItem>
                <NavItem>
                    <WeatherParent position={position} />
                </NavItem>
                <NavItem>
                    <NavLink href="#">BirdR</NavLink>
                </NavItem>
            </Nav>
            </Sidebar>
            {/* <Row>
                <Col md="4"> */}
                     {/* <SightingCreate fetchSightings={fetchSightings} token={props.token}/> */}
                 </Col>
                 <Col md="8">
                     {/* <CardDeck> */}
                     <SightingCards sightings={sightings} fetchSightings={fetchSightings} editUpdateSighting={editUpdateSighting} updateOn={updateOn} token={props.token} />
                     {/* </CardDeck> */}
                </Col>
                {updateActive ? <SightingEdit sightingToUpdate={sightingToUpdate} updateOff={updateOff} token={props.token} fetchSightings={fetchSightings} /> : <></>}
            </Row>
        </Container>
        
        <div>
           {/* <WeatherParent position={position} />  */}
        </div>
        </NewBackground>
        </IndexDiv>
    )
}

export default SightingIndex;
