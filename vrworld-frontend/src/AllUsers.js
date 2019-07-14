import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, Row, Col, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import './friends.css'   


export default class AllUsers extends React.Component  {


        render(){
            return(
                <div className="card2">
                <Row>
                {this.props.users.filter(user => user.name.toLowerCase().includes(this.props.search)).filter(user => !this.props.follows.includes(user)).map(user => (
                    user.id === this.props.currentUser.id 

                    ?
                    null
                    :
                    
                        <Col sm="6">
                        <Card style={{textAlign: "center"}} body >
                        <CardImg top width="100%" src={user.profile_url} alt="Card image cap" />
                        <CardTitle onClick={() => this.goToFriendsPage(user)}>
                        <span>{user.name}</span>
                        </CardTitle>
                        
                        <Button  onClick={(e) => this.addFollower(user)}>Follow</Button>
                        
                        </Card>
                    </Col>
                    
                  
                ))}
                  
                   
            </Row><br/>
            </div>
            

            )
        }

}
    