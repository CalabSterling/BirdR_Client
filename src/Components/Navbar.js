import React, {useState} from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';

const Navbar = (props) => {

  return (
    <div>
      <Nav>
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
        <NavItem>
          <Button onClick={props.fetchSightings}>Add a bird</Button>
        </NavItem>
      </Nav>
    </div>
  );
}

export default Navbar;