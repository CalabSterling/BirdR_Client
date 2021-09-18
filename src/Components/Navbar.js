import React from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import styled from 'styled-components';

const Navbar = (props) => {
  const Navdiv = styled.div `
    background-color: white;
    margin-bottom: 0%;
    width: 100vw;
    z-index: 100;
    /* position: fixed; */
  ` 

  return (
    <Navdiv>
      <Nav className="mr-auto">
        <NavItem>
          <NavLink href="#" ml-auto>BirdR</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" >Link</NavLink>
        </NavItem>
        <NavItem>
          <Button onClick={props.clickLogout}>Logout</Button>
        </NavItem>
      </Nav>
      </Navdiv>
  );
}

export default Navbar;