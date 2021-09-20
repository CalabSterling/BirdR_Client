import React from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink, Button } from 'reactstrap';
import styled from 'styled-components';

// const Navbar = (props) => {
//   const Navdiv = styled.div `
//     background-color: white;
//     margin-bottom: 0%;
//     width: 100vw;
//     z-index: 100;
//     /* position: fixed; */
//   ` 

//   return (
//     <Navdiv>
//       <Nav className="mr-auto">
//         <NavItem>
//           <NavLink href="#" ml-auto>BirdR</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink href="#" >Link</NavLink>
//         </NavItem>
//         <NavItem>
//           <Button onClick={props.clickLogout}>Logout</Button>
//         </NavItem>
//       </Nav>
//       </Navdiv>
//   );
// }

// export default Navbar;

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return ( 
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
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
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
   );
}
 
export default Sitebar;