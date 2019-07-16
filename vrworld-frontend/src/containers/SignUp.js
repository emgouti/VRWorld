import React from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../styles/login.css'

export class SignUp extends React.Component {
  state =  { 
        username: "", 
        email: "", 
        password: "" , 
        name: "" ,
        profile_url: "https://res.cloudinary.com/emmagouti/image/upload/v1551589342/profilepics/oxqxv9y5jeypxmhxifw5.png"
    }
    

    handleChange = (e) => {
      // debugger
      // console.log(e.target.name)
        this.setState({
            [e.target.name]:e.target.value
        })
    }

  handleSubmit = e => {
    e.preventDefault()

    // debugger
    // console.log(this.state)
    fetch(`http://${this.props.local}:3000/users`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` 
      },
      body: JSON.stringify(this.state)
  })
      .then(resp => resp.json())
      .then(() => {
        this.routeTo('/')
         })

  }

 

  uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: 'emmagouti', upload_preset: 'profilepic', sources: [ 'local', 'url', 'image_search', "camera", 'facebook', 'instagram', 'dropbox']}, (error, result) => {
        if (result.event === "success")
        this.setState({profile_url: result.info.url})
        
        }

        )
   
     }

  routeTo = url => {
    this.props.history.push(url);
  }

  render() {
    
    return (
      <div className="login">
  
  <Form onSubmit={e => {this.handleSubmit(e)}}>
        <FormGroup row >
          <Label for="name" sm={2}>Name</Label>
          <Col sm={10}>
            <Input onChange={e => this.handleChange(e)} value={this.state.name} type="name" name="name" id="name" placeholder="Emma Gouti" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="username" sm={2}>Username</Label>
          <Col sm={10}>
            <Input onChange={e => this.handleChange(e)} value={this.state.username} type="username" name="username" id="username" placeholder="emma" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="email" sm={2}>Email</Label>
          <Col sm={10}>
            <Input onChange={e => this.handleChange(e)} value={this.state.email} type="email" name="email" id="email" placeholder="emma@example.com" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={2}>Password</Label>
          <Col sm={10}>
            <Input onChange={e => this.handleChange(e)} value={this.state.password} type="password" name="password" id="password" placeholder="password" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>Profile Picture</Label>
          <Col sm={10}>
          <Button onClick={this.uploadWidget} id="upload_widget" class="cloudinary-button" color="primary">Upload</Button>
            <FormText color="muted">
              Add an image of yourself!
            </FormText>
          </Col>
        </FormGroup>
        
        <Button onSubmit={e => {this.handleSubmit(e)}}>Submit</Button>
       
        </Form>


      {/* <form onSubmit={e => {this.handleSubmit(e);}}>
       <h3>SignUp</h3>
       <div>
       <label>Username</label>
         <input
               name="username"
               placeholder="Enter username"
               value={this.state.username}
               type="text"
               onChange={e => this.handleChange(e)}
           />
       </div>
       <div>
         <label>Email</label>
           <input
               name="email"
               placeholder="Enter email"
               value={this.state.email}
               type="email"
               onChange={e => this.handleChange(e)}
           />
       </div>

       <div>
         <label>Password</label>
           <input
               name="password"
               placeholder="Enter password"
               value={this.state.password}
               type="password"
               onChange={e => this.handleChange(e)}
           />
       </div>
       <div>
         <label>Name</label>
           <input
               name="name"
               placeholder="Enter Name"
               value={this.state.name}
               type="name"
               onChange={e => this.handleChange(e)}
           />
       </div>
       
       <button >Sign Up</button>
     </form> */}
     </div>
    );
  }
}

export default SignUp