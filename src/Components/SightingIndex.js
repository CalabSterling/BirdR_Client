import React, {useState, useEffect } from 'react';
import { Button, Container, NavbarBrand, NavbarToggler, Collapse, Navbar, Nav, NavItem, NavLink, Row, Col, CardDeck, CardColumns, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import SightingCreate from './SightingCreate';
import SightingCards from './SightingCards';
import SightingEdit from './SightingEdit';
import WeatherParent from './WeatherParent';
import styled from 'styled-components';

const NewBackground = styled.body`
    background-color: lightblue;
    height: 100%;
    width: 100vw;
    margin-top: 0px;
`;

const IndexDiv = styled.div`
    margin-top: 0%;
    padding-top: 0%;
    display: block;
`;


const SightingIndex = (props) => {
    const [sightings, setSightings] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [sightingToUpdate, setSightingToUpdate] = useState({});


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
        <IndexDiv id="sightingIndex">
        <NewBackground>
          
        <Container>
        <Row>
            <Col md="4">  
            {/* <Sidebar>
                <Navbar light expand="md" id="Navbar">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav vertical>
                    <NavbarBrand href="#sightingIndex" id="birdr">BirdR</NavbarBrand>
                        <NavItem className="sightingNavItem" id="addABirdNav">
                            <SightingCreate fetchSightings={fetchSightings} token={props.token}/>
                        </NavItem>
                        <NavItem className="sightingNavItem">
                            <NavLink href="https://www.aba.org/aba-checklist/" target='_blank'>Rarity Rating Reference</NavLink>
                        </NavItem>
                        <NavItem className="sightingNavItem">
                            <WeatherParent position={position} />
                        </NavItem>
                        <NavItem className="sightingNavItem">
                            <NavLink href="http://hint.fm/wind/" target="_blank">Wind Conditions</NavLink>
                        </NavItem>
                        <NavItem className="sightingNavItem">
                        <Button onClick={props.updateFeedMine} className="sighting-button">My Sightings</Button>
                        </NavItem>
                        <NavItem className="sightingNavItem">
                        <Button onClick={props.updateFeedGlobal} className="sighting-button">The Birdfeed</Button>
                        </NavItem >
                        <NavItem className="sightingNavItem">
                        <Button onClick={props.clickLogout} className="sighting-button">Logout</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </Sidebar> */}
            </Col> 
            
                 <Col md="8">
                      <SightingCards sightings={sightings} fetchSightings={fetchSightings} editUpdateSighting={editUpdateSighting} updateOn={updateOn} token={props.token} updateSightingFeed={props.updateSightingFeed}/> 
                </Col>
                {updateActive ? <SightingEdit sightingToUpdate={sightingToUpdate} updateOff={updateOff} token={props.token} fetchSightings={fetchSightings} /> : <></>}
        </Row>  
        </Container>
        
        </NewBackground>
        </IndexDiv>
    )
}

export default SightingIndex;
