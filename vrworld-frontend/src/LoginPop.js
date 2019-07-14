import React from 'react'
import { Col, Form, FormGroup, Label, Input} from 'reactstrap';
// import './login.css'
import { Alert } from "react-bootstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LoginPop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          username: '',
          password: '',
          errors: null
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    
    
      routeTo = url => {
        this.props.history.push(url)
      }

      handleChange = (e) => {
        this.setState({
          errors: '',
            [e.target.name]:e.target.value
        })
    }
  
  
    errorBox() {
      
      if (  this.state.errors) {
        return (
          <Alert role="alert">
            {  this.state.errors}
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
              this.props.props.history.push(`/users/${res.id}/UserProfile`);
            
            }
      })
      
      }
    
    
      render() {


        return (
          <div>
          
        
     
        <Button color="danger" onClick={this.toggle}>Go To Your Photos</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
          <ModalHeader style={{textAlign: "center"}} toggle={this.toggle}>Welcome Back to VR World</ModalHeader>
          <ModalBody>
          <Form onSubmit={this.login}>
                <FormGroup row>
                <Label for="exampleEmail" sm={2}>Username</Label>
                <Col  sm={7}>
                    <Input onChange={this.handleChange} value={this.state.username} name="username" type="text" bsSize="lg" />
                </Col>
                </FormGroup>
                <FormGroup row>
                <Label for="exampleEmail2" sm={2}>Password</Label>
                <Col  sm={7}>
                    <Input onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="" />
                </Col>
                </FormGroup>
                {/* <Button onClick={this.login}>Submit</Button> */}
            </Form>
          </ModalBody>
          <ModalFooter >
          {this.errorBox()}
            <Button color="primary" onClick={this.login}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default LoginPop;

//           <h1>Login</h1>
//               <Form>
//                 <FormGroup row>
//                 <Label for="exampleEmail" sm={2} size="lg">UserName</Label>
//                 <Col sm={10}>
//                     <Input onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="UserName" bsSize="lg" />
//                 </Col>
//                 </FormGroup>
//                 <FormGroup row>
//                 <Label for="exampleEmail2" sm={2}>Password</Label>
//                 <Col sm={10}>
//                     <Input onChange={this.handleChange} value={this.state.password} name="password" type="text" placeholder="Password" />
//                 </Col>
//                 </FormGroup>
//                 <Button onClick={this.login}>Submit</Button>
//             </Form>


            
//           </div>
//           </div>
//         )
//       }
    
      
// }



// export default Login