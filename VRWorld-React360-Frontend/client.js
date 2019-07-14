import * as OVRUI from 'ovrui'
import {ReactInstance, Module} from 'react-360-web';
import ControllerRayCaster from 'react-vr-controller-raycaster';
import * as THREE from 'three'
import SimpleRaycaster from "simple-raycaster";
import WebVRPolyfill from 'webvr-polyfill';

const local = "127.0.0.1"
class Params extends Module {
  
  constructor(){
    super('Params')
    
    var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        this[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
      // for (var i = 0; i < vars.length; i++) {
      //     var pair = vars[i].split('=');
      //     if(this[decodeURIComponent(pair[0])] === 'user'){
      //       this.user = decodeURIComponent(pair[1])
      //     }
      //     this[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      // }
      }
      // setTitle(title) {
      //   document.title = title;
      //   }

    goHome() {
      window.location.assign(`http://${local}:3001/`)
    }
}


function init(bundle, parent, options = {}) {
const polyfill = new WebVRPolyfill();
// Polyfill always provides us with `navigator.getVRDisplays`
navigator.getVRDisplays().then(displays => {
  // If we have a native VRDisplay, or if the polyfill
  // provided us with a CardboardVRDisplay, use it
  if (displays.length) {
    vrDisplay = displays[0];
    controls = new THREE.VRControls(camera);
    vrDisplay.requestAnimationFrame(animate);
  } else {
    // If we don't have a VRDisplay, we're probably on
    // a desktop environment, so set up desktop-oriented controls
    controls = new THREE.OrbitControls(camera);
    requestAnimationFrame(animate);
  }
}); 
// console.log(this.props.params.userId)

  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    cursorVisibility: "auto",
    ...options,
    nativeModules: [
      new Params(),
    ]
    
  });
  
  
  


  
  r360.renderToSurface(
    r360.createRoot('stream', {
      photos: [
        {uri: './static_assets/alaska_talkeetna.jpg', title: "alaska_talkeetna"},
        {uri: './static_assets/SaguaroWest.jpg', title: "SaguaroWest"},
        {uri: './static_assets/tree.jpg', title: "San Fran"},

        
      ],
    }),
    r360.getDefaultSurface()
  );

  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(SimpleRaycaster);
 
}



window.React360 = {init};

