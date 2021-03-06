import React from 'react';
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
  DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand style={{color: "black", 'fontSize': '25px'}} href="/">V R W o r l d</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
              {
                this.props.currentUser
                ?
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink>
                          <Link style={{color: 'black'}} to="/images"> Explore </Link> 
                        </NavLink>
                      </NavItem>
                    <NavItem>
                      <NavLink>
                        <Link style={{color: 'black'}} to="/friends"> All Users </Link> 
                      </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          {this.props.currentUser.name}
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>
                            <NavLink>
                              <Link style={{color: 'gray'}} to={`/users/${this.props.currentUser.id}/UserProfile`}>Profile</Link> 
                            </NavLink>
                          </DropdownItem>
                          {/* <DropdownItem>
                            My Friends
                          </DropdownItem> */}
                          <DropdownItem divider />
                          <DropdownItem>
                            <div onClick={ this.props.logout }>
                              <NavItem >
                                <NavLink>
                                  <Link style={{color: 'black'}} to='/' > Logout </Link> 
                                </NavLink>
                              </NavItem>
                            </div>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                  </Nav>
                :
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                    <div onClick={ this.props.login }>
                    <NavItem >
                      <NavLink>
                        <Link style={{color: 'gray'}} to="/login"> Login </Link> 
                      </NavLink>
                    </NavItem>
                    </div>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Link style={{color: 'gray'}} to="/signup"> Sign Up </Link> 
                      </NavLink>
                    </NavItem>
                  </Nav>
              }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}