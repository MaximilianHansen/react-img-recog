import React, {Component} from 'react';
import './App.css';
import Nav from './components/nav/nav';
import Logo from './components/logo/Logo';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import FaceRecog from './components/FaceRecog/FaceRecog'
import Signin from './components/Signin/signin'
import Register from './components/Register/Register';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '6d3d8bafe090435aac9117d98d7a84d0'
});

const particlesOptions = {
  particles : {
    number: {
      density: {
        enable: true,
        value_area: 800,
        },
      value: 80,
    }
  ,
  line_linked: {
    shadow: {
      enable: true,
      color: "#3CA9D1",
      blur: 5,
    }
  },
  move: {
    enable: true,
    speed: 15,
    direction: "none",
    random: false,
    straight: false,
    out_mode: "out",
    bounce: false,
    attract: {
      enable: false,
      rotateX: 600,
      rotateY: 1200
    }
  }
}}



class App extends Component {
  constructor() {
    super();
    this.state = {
      inputText : '',
      imageUrl : '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box : box});
  }

onButtonClick = () => {
  this.setState({imageUrl : this.state.inputText})
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.inputText)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
}

 onInputChange = (x) => { 
  this.setState({inputText : x.target.value})
  }

  onRouteChange = (route) => {
    this.setState({route : route});
  }


  render() {
    return (
     
      <div className= "App"> 
        <Particles 
        className = "particles"
        params={particlesOptions}
        />
        { this.state.route ==='home' ?
        <div>
          <div className= 'navbar'>
            <Logo /> 
            <Nav onRouteChange={this.onRouteChange}/> 
          </div>
          <Rank/>
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonClick = {this.onButtonClick}/>
          <FaceRecog box = {this.state.box} imageUrl = {this.state.imageUrl}/>
        </div>
        : ( 
          this.state.route ==='signin' ?
          <Signin onRouteChange={this.onRouteChange}/> :
          <Register onRouteChange={this.onRouteChange}/>
        )
        
        
        
        }
       
      </div>
    );
  }
}
export default App;
