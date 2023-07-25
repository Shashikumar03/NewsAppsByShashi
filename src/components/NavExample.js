import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

export default class NavExample extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand to="/">News Article</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/general">
                  Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={Link} to="/entertainment">
                  Entertainment
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/business">
                  Bussiness
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/health">
                  Health
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/science">
                  Science
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/sports">
                  Sports
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/technology">
                  Technology
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}