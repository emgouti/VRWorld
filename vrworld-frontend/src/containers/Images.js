import React, { Component } from 'react'
import { Card, Button, CardImg, CardTitle, CardBody, FormGroup, Label, Input } from 'reactstrap';
import { Row, Col, Form} from 'reactstrap';
import '../styles/images.css'
import Comment from '../components/Comment'

export default class Images extends Component {

    state = {
        images: [],
        collections: [],
        users: [],
        comment: "",
        comments: []
    }

    componentDidMount = () => {
        fetch(`https://vrworld-back.herokuapp.com/images`, {
          'method': 'get',
          'headers': {
            'Authorization': `Bearer ${this.props.token}`
          }

        })
        .then(res => res.json())
        .then( json => this.setState({
          images: json
    }))
       .then(this.fetchUsers)
       .then(this.fetchComments)
    }

    fetchUsers = () => {
        fetch(`https://vrworld-back.herokuapp.com/users`, {
        'method': 'get',
        'headers': {
          'Authorization': `Bearer ${this.props.token}`
        }
      })
        .then(res => res.json())
        .then(res => this.setState({
            users: res
        }))
    }

    fetchComments = () => {
      fetch(`https://vrworld-back.herokuapp.com/comments`, {
        'method': 'get',
        'headers': {
          'Authorization': `Bearer ${this.props.token}`
        }
      })
        .then(res => res.json())
        .then(res => this.setState({
            comments: res
        }))
    }

  handleClick = (image) => {
    console.log(image)
    fetch(`https://vrworld-back.herokuapp.com/collections`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify(
          {
          image_id: image,
          user_id: this.props.currentUser.id
          }
      )
  })
  }

  getComment = (e) => {
    e.preventDefault()
    this.setState({
      comment: e.target.value
    })
  }

  submitComment = (id) => {
    
    fetch(`https://vrworld-back.herokuapp.com/comments`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify(
          {
          image_id: id,
          user_id: this.props.currentUser.id,
          content: this.state.comment
          }
      )
        })
        .then(this.fetchComments)
  }

  delete = (id) => {
    fetch(`https://vrworld-back.herokuapp.com/comments/${id}`, {
      method: 'delete',
      headers: {
          'Authorization': `Bearer ${this.props.token}`
      }
    })
    .then(this.fetchComments)
  }

  edit = (comment) => {
    fetch(`https://vrworld-back.herokuapp.com/comments/${comment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.token}`
      },
      body: JSON.stringify(
          {
          image_id: comment.image_id,
          user_id: comment.user_id,
          content: this.state.comment
          }
      )
        })
    .then(this.fetchComments)
  }

    render() {
        return (
        <div className="flexcontainer">
             <Row>
             {this.state.images.map((image) => (
                <Col sm="6">
                  <Card body style={{textAlign: "center"}}>
                    <CardImg top height="70%" width="70%" src={image.img_url} alt="Card image cap" />  
                        {this.state.users.length > 0 ? 
                          <CardTitle>
                              Uploaded By: {this.state.users.find( user => {
                                  return user.id === image.creator_id
                              }).name}
                          </CardTitle>
                        : null}
                          <br/>
                          <Button onClick={() => this.handleClick(image.id)}>Add to my collection</Button>
                          <CardBody className="body" style={{width: "100%", textAlign: "left"}}>
                          <div>
                            <Comment users={this.state.users} getComment={this.getComment} edit={this.edit}currentUser={this.props.currentUser} delete={this.delete} comments={this.state.comments.filter(comment => comment.image_id === image.id)} />
                            <Form onSubmit={() => this.submitComment(image.id)}>
                              <FormGroup>
                                <Label for="exampleText">Drop a Comment!</Label>
                                <Input onChange={(e) => this.getComment(e)}type="textarea" name="text" id="exampleText" />
                              </FormGroup>
                              <Button>Submit!</Button>
                            </Form>
                          </div>
                          </CardBody>
                          </Card> 
                      </Col>
                     ))}
                  </Row>  
              </div>
        )
    }
}






