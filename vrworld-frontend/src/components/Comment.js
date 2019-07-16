import React from 'react';
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup, Label, Input } from 'reactstrap';
import '../styles/comment.css'

export default class Comments extends React.Component  {
    constructor(props){
        super(props)
        this.state = {
            modal: false
          };
      
          this.toggle = this.toggle.bind(this);
    }
        
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }  
    
    render() {
      var regex1 = /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/
      var regex2 = /[0-9][0-9]:[0-9][0-9]/
        return (
            <div>
              <Table size="sm">
                <thead>
                  <tr>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.comments.map(comment=> (
                      this.props.users.filter(user => comment.user_id === user.id).map(user => (
                          <tr>
                            <td> 
                              <span>
                                {user.name}
                              </span>
                              <div className="comment">
                                 {/*COMMENT CONTENT RENDERED HERE  */}
                              {comment.content} 
                              </div>
                              <div className="date">
                              <p><small>Posted: {comment.created_at.match(regex1)} at {comment.created_at.match(regex2)}</small></p>
                              </div>
                            </td>
                            {comment.user_id === this.props.currentUser.id 
                              ?
                              <div className='comment-box'>
                                <div className="delete">
                                  <Button color="link" style={{'font-size': '10px', 'color': 'gray'}} onClick={() => this.props.delete(comment.id)}>Delete</Button>
                                </div>
                                <div className="edit">
                                  <Button color="link" style={{'font-size': '10px', 'color': 'gray'}} onClick={this.toggle}>Edit</Button>
                                </div>
                                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>Edit Your Comment</ModalHeader>
                                      <ModalBody>
                                        <Form onSubmit={() => this.submitComment(comment.id)}>
                                            <FormGroup>
                                              <Label for="exampleText">Drop a Comment!</Label>
                                              <Input onChange={(e) => this.props.getComment(e)}type="textarea" name="text" id="exampleText" />
                                            </FormGroup>
                                        </Form>
                                      </ModalBody>
                                    <ModalFooter>
                                      <Button color="primary" onClick={() => this.props.edit(comment)}>Submit</Button>{' '}
                                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                  </Modal>                       
                              </div>
                              :
                              null
                            }
                          </tr>
                      ))
                  ))}
                </tbody>
            </Table>                       
          </div>
          );
        }      
      };
      
    