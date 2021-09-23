import React, { useState, useEffect } from 'react';
import WeatherParent from './WeatherParent';
import { Button, NavbarBrand, NavbarToggler, Collapse, Navbar, Nav, NavItem } from 'reactstrap';
import styled from 'styled-components';

const Sidebar = styled.div`
    /* margin-top: 2%; */
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
              <NavItem className="sightingNavItem">
                <Button onClick={props.updateFeedMine} className="sighting-button">My Sightings</Button>
              </NavItem>
              <NavItem className="sightingNavItem">
                <Button onClick={props.updateFeedGlobal} className="sighting-button">The Birdfeed</Button>
              </NavItem >
              <NavItem className="sightingNavItem">
                <WeatherParent position={position} />
              </NavItem>
              <NavItem className="sightingNavItem">
                <Button className="sighting-button"><a href="http://hint.fm/wind/" target="_blank" className="nav-button" style={{ textDecoration: "none" }}>Current Wind</a></Button>
              </NavItem >
              <NavItem className="sightingNavItem">
                <Button className="sighting-button"><a href="https://www.aba.org/aba-checklist/" target="_blank" style={{ textDecoration: "none" }}>Rarity Codes</a></Button>
              </NavItem >
              <NavItem className="sightingNavItem">
                <Button onClick={props.clickLogout} className="sighting-button">Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Sidebar>
    </div>
   );
};
 
export default Sitebar;