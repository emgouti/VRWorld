import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, Row, Col, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import './styles/friends.css'

    export default class Friends extends React.Component  {

        state = {
            users: [],
            follows: [],
            search: ''
        }

        componentDidMount(){
            fetch(`http://${this.props.local}:3000/users`, {
                method: 'GET',
                headers: {
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
                follows: this.state.follows
                         .filter(follow => (follow.follower_id === this.props.currentUser.id))
            })
           
        }

        goToFriendsPage = (user) => {
            this.props.history.push(`/users/${user.id}/FriendProfile`);
        }

        removeFollower = (friend) => {
            fetch(`http://${this.props.local}:3000/${friend.following.username}/unfollow_user`, {
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
                    <div className="search-bar">
                        {/* search bar */}
                        <InputGroup>
                            <Input className="search" onChange={(e) => this.filter(e)} placeholder="Search Users..."/>
                            <InputGroupAddon addonType="append">
                            <Button color="dark" size="xs">Search</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div>
                        <h5 style={{textAlign: "center"}}>Following</h5>
                            {this.state.follows.length < 1 
                            ?
                            <h3 textAlign="center">You're not following anyone!</h3> 
                            :
                            <div className="following">
                                <Row>
                                    {this.state.follows
                                        .filter(follow => 
                                            follow.follower_id === this.props.currentUser.id 
                                            && follow.following.name.toLowerCase().includes(this.state.search.toLowerCase()))
                                        .map(follow => (
                                                <Col sm="6">
                                                    <Card body style={{textAlign: "center"}}>
                                                        <CardImg top width="100%" src={follow.following.profile_url} alt="Card image cap"/>
                                                        <CardTitle onClick={() => this.goToFriendsPage(follow.following)}>
                                                            <span>{follow.following.name}</span> 
                                                        </CardTitle>
                                                        <Button onClick={(e) => this.removeFollower(follow)}>Unfollow</Button>
                                                    </Card>
                                                </Col>
                                        ))
                                    }
                                </Row> 
                            </div> 
                            }
                        <h3 style={{textAlign: "center"}}>All Users</h3>
                        <div className="users">
                            <Row>
                                {this.state.users
                                    .filter(user => user.name.toLowerCase()
                                    .includes(this.state.search.toLowerCase()))
                                    .map(user => (
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
                                                    {this.state.follows.length > 0 
                                                        ?
                                                        // return boolean if user is in follows array
                                                        !!this.state.follows.find(follow => follow.following_id === user.id) 
                                                        ?
                                                        <Button onClick={(e) => this.removeFollower(this.state.follows.find(follow => follow.following_id === user.id))}>Unfollow</Button>
                                                        :
                                                        <Button onClick={(e) => this.addFollower(user)}>Follow</Button>
                                                        :
                                                        <Button onClick={(e) => this.addFollower(user)}>Follow</Button>
                                                    }    
                                            </Card>
                                        </Col>  
                                    ))
                                }
                            </Row>
                            <br/>
                        </div> 
                    </div>
                </div>
              );
            }      
      };
      
    