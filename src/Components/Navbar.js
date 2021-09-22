import React, { useState, useEffect } from 'react';
import SightingCreate from './SightingCreate';
import WeatherParent from './WeatherParent';
import { Button, Container, NavbarBrand, NavbarToggler, Collapse, Navbar, Nav, NavItem, NavLink, Row, Col, CardDeck, CardColumns } from 'reactstrap';
import styled from 'styled-components';

const Sidebar = styled.div`
    margin-top: 3%;
    position: fixed;
    z-index: 99;
    padding-left: 2%;
    /* display: block; */
    /* margin-bottom: 200px; */

    @media (max-width: 540px) {
        background-color: white;
    }
`;

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ lat: 0, lon: 0 });

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success => {
        var lat = success.coords.latitude;
        var lon = success.coords.longitude;
        console.log(lon, lat)
        setPosition({ lat: lat, lon: lon })
      })
    }, []);

  return (
    <div>
                 <Sidebar>
                <Navbar light expand="md" id="Navbar">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav vertical>
                    <NavbarBrand href="#sightingIndex" id="birdr">BirdR</NavbarBrand>
                        <NavItem className="sightingNavItem" id="addABirdNav">
                            <SightingCreate  token={props.token}/>
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
            </Sidebar>


      {/* <Nav>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#"></NavLink>
        </NavItem>
        <NavItem>
          <Button onClick={props.updateFeedMine}> My Sightings</Button>
        </NavItem>
        <NavItem>
          <Button onClick={props.updateFeedGlobal}> Global Sightings</Button>
        </NavItem>
        <NavItem>
          <Button onClick={props.clickLogout}>Logout</Button>
        </NavItem>
      </Nav> */}
    </div>
   );
}
 
export default Sitebar;