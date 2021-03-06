
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router'

import Login from './Login'
import SignUp from './SignUp'
import UserProfile from './UserProfile'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import Images from './Images'
import Friends from './Friends'
import FriendProfile from './FriendProfile'

import '../styles/styles.css';

const local = "127.0.0.1"
// const local = '192.168.2.127'

class App extends Component {

    state = {
      token: localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user')) || null,
      message: ""
    }

    reset = () => {
      this.setState({
        reset: !this.state.reset
      })
    }

    setCurrentUser = (token, user) => {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      this.setState ({ 
        token: token, 
        user: user
      }) 
    }

    logoutUser = () => {
      localStorage.clear()
      this.setState({ token: null, user: null})
    
    }
    
    login = e => {
      e.preventDefault();
      fetch(`https://vrworld-back.herokuapp.com/auth` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === "Wrong username or password") {
            this.setState({ errors: res.message })
          } else {
            this.props.setUser(res.token, res)
            this.props.history.push(`/users/${res.id}/UserProfile`);
          }
        });
    }

  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <NavBar currentUser={this.state.user} logout={this.logoutUser}/>
              <Switch>
                    <Route path="/login" render={(props) => <Login {...props} local={local} setUser={this.setCurrentUser} />} />
                    <Route path="/login" render={(props) => <Login {...props} local={local} setUser={this.setCurrentUser} />} />            
                    <Route path="/signup" render={ props => <SignUp {...props} local={local} onSignUp={this.setCurrentUser} />}/>
                    <Route path="/friends" render={ props => <Friends {...props} local={local} token={this.state.token} currentUser={this.state.user} />}/>
                    <Route path="/users/:id/UserProfile" component={props => <UserProfile local={local} {...props} token={this.state.token} setCurrentUser={this.login} reset={this.reset} currentUser={this.state.user}/>} />
                    <Route path="/users/:id/FriendProfile" component={props => <FriendProfile {...props} local={local} token={this.state.token} currentUser={this.state.user}/>} />
                    <Route path="/images" component={props => <Images {...props} local={local} reset={this.state.reset} token={this.state.token} currentUser={this.state.user}/>} />
                    <Route path="/" render={(props) => <Home props={props} local={local} token={this.state.token} setUser={this.setCurrentUser} currentUser={this.state.user}/>} /> 
              </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;

