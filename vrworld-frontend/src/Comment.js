import React from 'react';
import { Table } from 'reactstrap';
  import './comment.css'
  import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup, FormText, Label, Input } from 'reactstrap';

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

          
        render(){
        
console.log(this.props.comments, this.props.users)
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
                        {/* <tr>
                            {this.props.users.filter(user => this.props.comments.map(comment => comment.user_id === user.id)).map(user => (
                                <td>{user.name}</td>
                            ))}
                        </tr> */}
                        {/* <tr> */}
                            {this.props.comments.map(comment=> (
                                this.props.users.filter(user => comment.user_id === user.id).map(user => (
                                    <tr>
                                    <td> <span>{user.name}</span> {comment.content} Posted: {comment.created_at.match(regex1)} at {comment.created_at.match(regex2)}  </td>
                                    {comment.user_id === this.props.currentUser.id ?
                                    <div>
                                    <button onClick={() => this.props.delete(comment.id)}>Delete</button>
                                    <div>
                                    <Button color="light" onClick={this.toggle}>Edit</Button>
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
                                  </div>
                                    :
                                    null}
                                     </tr>
                                ))
                           
                            
                            ))}
                        
                        {/* </tr> */}
                       
                        </tbody>
                    </Table> 
                            
                </div>
              );

        }
        
      };
      
    