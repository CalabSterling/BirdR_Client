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

const Sidebar = styled.div`
    margin-top: 3%;
    position: fixed;
    z-index: 99;
    /* display: block; */

    @media (max-width: 540px) {
        background-color: white;
    }
`;


const SightingIndex = (props) => {
    const [sightings, setSightings] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [sightingToUpdate, setSightingToUpdate] = useState({});
    const [position, setPosition] = useState({ lat: 0, lon: 0 });
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    
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
            <Sidebar>
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
                        <Button onClick={props.clickLogout} className="sighting-button">Logout</Button>
                        </NavItem>
                        <NavItem className="sightingNavItem">
                        <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </Sidebar>
            </Col>
                 <Col md="8">
                     <SightingCards sightings={sightings} fetchSightings={fetchSightings} editUpdateSighting={editUpdateSighting} updateOn={updateOn} token={props.token} />
                </Col>
                {updateActive ? <SightingEdit sightingToUpdate={sightingToUpdate} updateOff={updateOff} token={props.token} fetchSightings={fetchSightings} /> : <></>}
            </Row>
        </Container>
        </NewBackground>
        </IndexDiv>
    )
}

export default SightingIndex;
