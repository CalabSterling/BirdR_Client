import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Navbar = (props) => {
  return (
    <div>
      <p>Random Nav Bar Placeholder</p>
      <Nav>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Another Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">Disabled Link</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default Navbar;