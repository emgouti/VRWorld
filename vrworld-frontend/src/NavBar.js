import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginPop from './LoginPop';


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
        <Navbar color="dark" light expand="md">
          <NavbarBrand style={{color: "white"}} href="/">VR WORLD</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
              {
                this.props.currentUser
                ?
                  <Nav className="ml-auto" navbar>
                  <NavItem>
                      <NavLink>
                        <Link style={{color: 'white'}} to="/images"> All Images </Link> 
                      </NavLink>
                    </NavItem>
                 <NavItem>
                      <NavLink>
                        <Link style={{color: 'white'}} to="/friends"> My Friends </Link> 
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink>
                        <Link style={{color: 'white'}} to={`/users/${this.props.currentUser.id}/UserProfile`}>{this.props.currentUser.name}</Link> 
                      </NavLink>
                    </NavItem>
                    <div onClick={ this.props.logout }>
                    <NavItem >
                      <NavLink>
                        <Link style={{color: 'white'}} to='/' > Logout </Link> 
                      </NavLink>
                    </NavItem>
                    </div>
                  </Nav>
                
                :
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                    <div onClick={ this.props.login }>
                    <NavItem >
                      {/* <LoginPop /> */}
                      <NavLink>
                        <Link style={{color: 'white'}} to="/login"> Login </Link> 
                      </NavLink>
                    </NavItem>
                    </div>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Link style={{color: 'white'}} to="/signup"> Sign Up </Link> 
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