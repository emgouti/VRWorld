import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, Row, Col, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import './friends.css'
  


    export default class Friends extends React.Component  {

        state = {
            users: [],
            follows: [],
            search: ''
        }

        componentDidMount(){
            fetch(`http://${this.props.local}:3000/users`, {
            'method': 'GET',
            'headers': {
              'Authorization': `Bearer ${this.props.token}`
            }
          })
       
        .then(res => res.json())
        .then(res => this.setState({
            users: res
        }))
        .then(this.getFollowers)
        // .then(this.parseThroughFollows)  
        }

        addFollower = (friend) => {
            fetch(`http://${this.props.local}:3000/${friend.username}/follow_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify(
                {
                following_id: friend.id,
                follower_id: this.props.currentUser.id
                }
            )
        })
        .then(this.getFollowers)
        }

        getFollowers = () => {
            fetch(`http://${this.props.local}:3000/users/following/${this.props.currentUser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(res => this.setState({
            follows: res
        }))
        .then(this.parseThroughFollows)
        }

        parseThroughFollows = () => {
            this.setState({
                follows: this.state.follows.filter(follow => (follow.follower_id === this.props.currentUser.id))
            })
           
        }

        

        goToFriendsPage = (user) => {
            console.log(user)
            this.props.history.push(`/users/${user.id}/FriendProfile`);
        }

        goToFriendsPage2 = (user) => {
            console.log(user)
            this.props.history.push(`/users/${user}/FriendProfile`);
        }

        removeFollower = (friend) => {
            fetch(`http://${this.props.local}:3000/${friend.username}/unfollow_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                },
                body: JSON.stringify(
                    {
                    following_id: friend.id,
                    follower_id: this.props.currentUser.id
                    }
                )
            })
            .then(this.getFollowers)
        }

        filter = (e) => {
            e.preventDefault()
            this.setState({
              search: e.target.value
            })
          }
        
        render(){
        


            return (
                <div>
                   
               <div>
               {/* <form class="example" action="action_page.php" >
                <input type="text" placeholder="Search.." name="search"/>
                <button type="submit"><i class="fa fa-search"></i></button>
                </form>
            */}
  <InputGroup>
      <Input className="search" onChange={(e) => this.filter(e)} placeholder="Search Users..."/>
      <InputGroupAddon addonType="append">
      <Button color="dark" size="xs">Search</Button>
      </InputGroupAddon>
    </InputGroup>
          
                    </div>
                <div>
                   <h3 style={{textAlign: "center"}}>Following</h3>
                   {this.state.follows.length < 1 
                   ?
                    <h3 textAlign="center">You're not following anyone!</h3> 
                    :
                <div className="card">
                   <Row>
                   {/* items={this.state.items.filter( i => i.title.toLowerCase().includes(this.state.search))} */}
                   {this.state.follows.filter(follow => follow.follower_id === this.props.currentUser.id && follow.following.name.toLowerCase().includes(this.state.search.toLowerCase())).map(follow => (
                      
                      <Col sm="6">
                          <Card body style={{textAlign: "center"}}>
                          
                          <CardImg top width="100%" src={follow.following.profile_url} alt="Card image cap" />
                          <CardTitle onClick={() => this.goToFriendsPage2(follow.following.id)}>
                          <span>{follow.following.name}</span>
                            
                            </CardTitle>
                          <Button onClick={(e) => this.removeFollower(follow.following)}>Unfollow</Button>
                          </Card>
                      </Col>
                     
                   ))}
                   </Row> 
                   </div> }
                   <h3 style={{textAlign: "center"}}>All Users</h3>

                   <div className="card2">
                    <Row>
                    {this.state.users.filter(user => user.name.toLowerCase().includes(this.state.search.toLowerCase())).map(user => (
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
                
                </div>
                </div>
              );

        }
        
      };
      
    