import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, Row, Col, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import './friends.css'   


export default class Followers extends React.Component  {


        render(){
            console.log(this.props.users, this.props.follows)
            return(
                <div>
                   <h3 style={{textAlign: "center"}}>Following</h3>
                   {this.props.follows.length < 1 
                   ?
                    <h3 textAlign="center">You're not following anyone!</h3> 
                    :
                <div className="card">
                   <Row>
                   {this.props.follows.filter(follow => follow.follower_id === this.props.currentUser.id && follow.following.name.toLowerCase().includes(this.props.search)).map(follow => (
                      
                      <Col sm="6">
                          <Card body style={{textAlign: "center"}}>
                          
                          <CardImg top width="100%" src={follow.following.profile_url} alt="Card image cap" />
                          <CardTitle onClick={() => this.goToFriendsPage(follow.following.following_id)}>
                          <span>{follow.following.name}</span>
                            
                            </CardTitle>
                          <Button onClick={(e) => this.removeFollower(follow.following)}>Unfollow</Button>
                          </Card>
                      </Col>
                     
                   ))}
                   </Row> 
                   </div> }
                </div>


            )
        }

}
    