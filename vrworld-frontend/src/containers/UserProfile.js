import React, { Component } from 'react';
import PicturesContainer from '../components/PicturesContainer'
import '../styles/userprofile.css'

export default class UserProfile extends Component {
    state = {
        images: [],
        favorites: [],
        currentImage: null,
        profile_url: ""
    }

    componentDidMount(){
        fetch(`https://vrworld-back.herokuapp.com/users/${this.props.currentUser.id}/images`, {
            'method': 'GET',
            'headers': {
              'Authorization': `Bearer ${this.props.token}`
            }
        })
        .then(res => res.json())
        .then(res => this.setState({
            images: res
        }))
       .then(this.profilePicFetch)
        //  .then(this.test)
    }

    // test = () => {
    //     fetch(`https://vrworld-back.herokuapp.com/imagesandcomment`, {
    //         'method': 'GET',
    //         'headers': {
    //           'Authorization': `Bearer ${this.props.token}`
    //         }
    //       })
       
    //     .then(res => res.json())
    //     .then(res => this.setState({
    //         test1: res.images,
    //         test2: res.comments
    //     }))
    // }

    onComplete = (e) => {
        console.log(e);
      };
    
      setCss = (e) => {
        const css = this.state.css;
        console.log(e);
        if (this.state.cssNoPosition) {
          css.position = 'fixed';
          css.top = 0;
        } else {
          css.position = '';
          css.top = '';
        }
        this.setState({
          css,
          cssNoPosition: !this.state.cssNoPosition,
        });
      };
    

    resetState = () => {
        fetch(`https://vrworld-back.herokuapp.com/users/${this.props.currentUser.id}/images`, {
            'method': 'GET',
            'headers': {
              'Authorization': `Bearer ${this.props.token}`
            }
          })
       
        .then(res => res.json())
        .then(res => this.setState({
            images: res
        }))
        .then(this.profilePicFetch)
    }

    profilePicFetch = () => {
        fetch(`https://vrworld-back.herokuapp.com/users/${this.props.currentUser.id}`, {
            'method': 'GET',
            'headers': {
              'Authorization': `Bearer ${this.props.token}`
            }
          })
       
        .then(res => res.json())
        .then(res => this.setState({
            profile_url: res.profile_url
        }))
    
        
    }

    sendImageToBackend = () => {
        // debugger
       if(this.state.currentImage)
        fetch(`https://vrworld-back.herokuapp.com/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify(
                {
                img_url: this.state.currentImage.url,
                creator_id: this.props.currentUser.id
                }
            )
        })
        .then(this.resetState)    
    }

    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: 'emmagouti', upload_preset: 'addimage', sources: [ 'local', 'url', 'image_search', 'camera', 'facebook', 'instagram', 'dropbox']}, (error, result) => {
            if (result.event === "success")
            this.setState({currentImage: result.info}, () => {this.sendImageToBackend()})
            
            }
            )
    }

    editWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: 'emmagouti', upload_preset: 'profilepic', sources: [ 'local', 'url', 'image_search', "camera", 'facebook', 'instagram', 'dropbox']}, (error, result) => {
        if (result.event === "success")
        this.setState({profile_url: result.info.url}, () => {this.updateImage()})
        
        }
        )
    }
         
    handleClick = () => {
        fetch(`https://vrworld-back.herokuapp.com/collections`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body: JSON.stringify(
                {
                user_id: this.props.currentUser.id
                }
            )
        })
    }
    
    vrmode = () => {
        window.location.assign(`http://${this.props.local}:8081/index.html?user=${this.props.currentUser.id}&token=${this.props.token}`)
    }


    updateImage = () => {
        console.log(this.state.profile_url)
        fetch(`https://vrworld-back.herokuapp.com/users/${this.props.currentUser.id}`, {
            'method': 'PATCH',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            'body': JSON.stringify({
                profile_url: this.state.profile_url
            })
          })
        //   .then(this.props.login)
        
    }

    delete = (id) => {
        
        fetch(`https://vrworld-back.herokuapp.com/collections/${id}`, {
            'method': 'DELETE',
            'headers': {
                'Authorization': `Bearer ${this.props.token}`
            }
          })
          .then(
              fetch(`https://vrworld-back.herokuapp.com/images/${id}`, {
            'method': 'DELETE',
            'headers': {
                'Authorization': `Bearer ${this.props.token}`
            }
          }))
          .then(this.resetState)
          
    }

    render() {
        return (
            <div >
                <PicturesContainer 
                    state={this.state} 
                    uploadWidget={this.uploadWidget} 
                    editWidget={this.editWidget} 
                    currentUser={this.props.currentUser} 
                    vrmode={this.vrmode} 
                    active={true} 
                    delete={this.delete}
                />
            </div>
        );
    }
}

