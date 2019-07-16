import React from 'react'
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../styles/login.css'
import { Alert } from "react-bootstrap";

class Login extends React.Component {

    state = {
        username: '',
        password: '',
        errors: null
    }

    routeTo = url => {
        this.props.history.push(url)
      }

      handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
  
  
    errorBox() { 
      if (this.state.errors) {
        return (
          <Alert role="alert">
            {this.state.errors}
          </Alert>
        )    
      }
    }

      login = e => {
        e.preventDefault();
        fetch(`http://${this.props.local}:3000/auth` , {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
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
          <div>
            <h1>Login</h1>
            <div class="login">
              <div className="container">
                <p align="center">Please login to access your photos</p><br />
                  <Form onSubmit={this.login}>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}></Label>
                        <Col sm={8}>
                          <Input onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="username" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}></Label>
                        <Col sm={8}>
                            <Input onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="password" />
                        </Col>
                      <Button align="center" type="submit" >Login!</Button>
                    </FormGroup>
                </Form>
                </div>
            </div>
        </div>
      )
    }   
}



export default Login