import React from 'react';
import {NativeModules} from 'react-360';
const { Params } = NativeModules;
import {
  AppRegistry,
  Environment,
  StyleSheet,
  Text,
  View,
  VrButton,
  Image,
   asset
} from 'react-360';

const local = "127.0.0.1"




class Background extends React.Component {
  constructor(props) {
    super();
    Environment.setBackgroundImage(props.uri, {format: props.format});
    
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uri !== this.props.uri ||
      nextProps.format !== this.props.format
    ) {
      Environment.setBackgroundImage(nextProps.uri, {format: nextProps.format});
    }
  }

  render() {
    


    return null;
  }
}

class Slideshow extends React.Component {
  constructor() {
    super();
    this.goForward = this.goForward.bind(this); // make sure this.click is in the right context when the timeout is called
    this.goBack = this.goBack.bind(this);
    this.pickPhoto = this.pickPhoto.bind(this);
    this.goBackMain = this.goBackMain.bind(this);
    }

  state = {
    index: 0,
    images: [],
    watchTime: 2,
    progress: 0,
    watching: false,
    vrMode: true,
    comments: []
  };

  componentDidMount(){
  
    
    fetch(`http://${local}:3000/${Params.user}/imagesandcomment`,{
      headers:{
        Authorization: `Bearer ${Params.token}`
      }
    })
    .then(res => res.json())
    .then(res => this.setState({
      images: res.images,
      comments: res.comments
    }))
    
  }



  startClickCountdown(clickFunction) {
    this.timeout = setTimeout(()=> {
      clickFunction()
      }, 1500) 
      
      console.log('ok');
}

stopProgress() {
  clearTimeout(this.timeout);
this.timeout = null;
console.log('stop');

}
  

  goForward() {
    this.setState({
      index: this.state.index + 1,
    });
    }

  goBack() {
    let next = this.state.index - 1;
    if (next < 0) {
      next += this.state.images.length;
    }
    this.setState({
      index: next,
    });
    }

    pickPhoto() {
      this.setState({
        vrMode: false
      })
    }

    goBackMain() {
      this.setState({
        vrMode: true
      })
    }

  render() {
    const current = this.state.images[
      this.state.index % this.state.images.length
    ];
    console.log("photos",this.props.photos)
   
    console.log("comments", this.state.comments)
    console.log("current",current)
   if(this.state.vrMode){
    return (
      
      <View style={styles.wrapper}>
      <View>
        <VrButton 
           onEnter={ () => this.startClickCountdown(Params.goHome) }
           onExit={ () => this.stopProgress() }
          style={styles.button}>
            <Text style={styles.buttonText}>{'Return Home'}</Text>
          </VrButton>
      </View>
      {current ?
      <Background uri={current.img_url} format={current.format} />
    :
      this.state.images.map(image => 
      <Background uri={image.img_url} format={image.format} />
      )
    }
        <View style={styles.controls}>
      
          <VrButton 
          onEnter={ () => this.startClickCountdown(this.goBack) }
          onExit={ () => this.stopProgress() }
          style={styles.button}>
            <Text style={styles.buttonText}>{'<'}</Text>
    
          </VrButton>
          <View>
            {/* <Text style={styles.title}></Text> */}
          </View>
          <VrButton 
           onEnter={ () => this.startClickCountdown(this.goForward) }
           onExit={ () => this.stopProgress() }
           style={styles.button}>
            <Text style={styles.buttonText}>{'>'}</Text>
          </VrButton>
        </View>
        <View>
        <VrButton 
           onEnter={ () => this.startClickCountdown(this.pickPhoto) }
           onExit={ () => this.stopProgress() }
          style={styles.button}>
            <Text style={styles.buttonText}>{'View Comments'}</Text>
          </VrButton>
      </View>
      </View>
    ) 

   } else {
    return (
      <View style={styles.panel}>
      <Text style={styles.otherText}>IMAGE COMMENTS</Text>
      <View style={styles.section}>
      </View>
      <View style={styles.scenePage}>
      <View>
      {this.state.comments.map(comment=> 
            comment.map(c => (
          <View>
               {c.image_id === current.id ?
                <Text style={styles.otherText}> {c.content}</Text>
        :
        null
               }
          </View>
        ))
        
         
        )}
      </View>
      </View>
      <VrButton 
           onEnter={ () => this.startClickCountdown(this.goBackMain) }
           onExit={ () => this.stopProgress() }
          style={styles.button}>
            <Text style={styles.buttonText}>{'Go Back to Main'}</Text>
          </VrButton>
    </View>
    )
  }
    
  } 
} 
  


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
    width: 1000,
  },
  controls: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 600,
    padding: 10,
  },
  title: {
    color: 'transparent',
    textAlign: 'left',
    fontSize: 36,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    width: 100,
    height: 44,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  otherText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 35,
    fontWeight: 'bold',
  },
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    padding: 5,
    width: 750,
    backgroundColor: '#000000',
    borderColor: 'white',
    borderWidth: 2,
    flexDirection: 'row',
  },
  scenePage: {
    padding: 5,
    width: 900,
    height: 300,
    backgroundColor: 'grey',
    borderRadius: 5,
  }
});

AppRegistry.registerComponent('stream', () => Slideshow);
