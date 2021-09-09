import React from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';

const Navbar = (props) => {
  return (
    <div>
      <Nav>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <Button onClick={props.clickLogout}>Logout</Button>
        </NavItem>
      </Nav>
    </div>
  );
}

export default Navbar;