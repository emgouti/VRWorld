import React, { Component } from 'react';

import { Card, Button, CardImg, CardTitle } from 'reactstrap';
import { Row, Col, Jumbotron, Container } from 'reactstrap';

import '../styles/userprofile.css'
import '../styles/pictures.css'

export default class PicturesContainer extends Component {

    render() {
        return (
            <div>
               <div className="user">
                {this.props.active === true
                    ?
                    // show current User's profile
                    <div> 
                        <div className="main">
                            <div className="big">
                                <Jumbotron style={{ backgroundColor: "darkgrey"}}  fluid>
                                    <Container style={{ textAlign: "center"}} fluid>
                                        <div className="card3">
                                            <Card body style={{textAlign: "center"}}>
                                                <CardImg 
                                                    top height="40%" 
                                                    width="40%" 
                                                    src={this.props.state.profile_url} 
                                                    alt="Card image cap" 
                                                />
                                            </Card>
                                        </div>
                                        <h1  className="display-3">Welcome, {this.props.currentUser.name}.</h1>
                                        <p className="lead">Upload your images and view them in VR.</p>
                                            <Button 
                                                onClick={this.props.editWidget} 
                                                id="upload_widget" 
                                                class="cloudinary-button" 
                                                color="light"
                                            > 
                                            Edit Profile Picture
                                            </Button> <br/>
                                            <br/>
                                            <Button 
                                                onClick={this.props.uploadWidget} 
                                                id="upload_widget" 
                                                class="cloudinary-button" 
                                                color="light"
                                            >
                                            Upload a Photo
                                            </Button> <br/>
                                            <br/>
                                            <Button 
                                                onClick={this.props.vrmode} 
                                                color="dark"
                                            > 
                                            VR MODE
                                            </Button>
                                    </Container>
                                </Jumbotron>
                            </div>
                            <div className="small">
                                <Row>
                                    {this.props.state.images 
                                        ? 
                                        this.props.state.images.map(image => (
                                            <Col sm="6">
                                                <Card body style={{textAlign: "center"}}>
                                                <CardImg 
                                                    top height="70%" 
                                                    width="70%" 
                                                    src={image.img_url} 
                                                    alt="Card image cap" 
                                                />
                                                {/* <CardTitle>Uploaded By: {this.props.currentUser.name}</CardTitle> */}
                                                <br/>
                                                <Button onClick={e => this.props.delete(image.id)}>Delete</Button>
                                                </Card>
                                            </Col>
                                        ))
                                        : null}
                                </Row> 
                            </div>
                        </div>
                     </div>
                     :
                    //  show friend's profile
                     <div> 
                        <div className="main">
                            <div className="big">
                                <Jumbotron style={{ backgroundColor: "darkgrey"}}  fluid>
                                    <Container style={{ textAlign: "center"}} fluid>
                                        <div className="card3">
                                            <Card body style={{textAlign: "center"}}>
                                                <CardImg 
                                                    top 
                                                    height="40%" 
                                                    width="40%" 
                                                    src={this.props.state.profile_url} 
                                                    alt="Card image cap" 
                                                />   
                                            </Card>
                                        </div>
                                        <h1 className="display-3">{this.props.currentUser.name}</h1>
                                        <br/>
                                        <Button onClick={this.props.vrmode} color="dark">VR MODE</Button>
                                    </Container>
                                </Jumbotron>  
                            </div>
                            <div className="small">
                             <Row>
                                {this.props.state.images 
                                    ? 
                                    this.props.state.images.map(image => (
                                        <Col sm="6">
                                            <Card body style={{textAlign: "center"}}>
                                                <CardImg 
                                                    top 
                                                    height="70%" 
                                                    width="70%" 
                                                    src={image.img_url} 
                                                    alt="Card image cap" 
                                                />
                                                <CardTitle>
                                                    Uploaded By: {this.props.currentUser.name}
                                                </CardTitle>
                                                <Button onClick={e => this.props.delete(image.id)}>Delete</Button>
                                            </Card>
                                        </Col>
                                    ))
                                    : null}
                            </Row> 
                          </div>
                        </div>
                    </div>
                    }
            </div>
        </div>
        )    
    }
}

