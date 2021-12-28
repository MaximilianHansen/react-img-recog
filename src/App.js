import React, {Component} from 'react';
import './App.css';
import Nav from './components/nav/nav';
import Logo from './components/logo/Logo';
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import FaceRecog from './components/FaceRecog/FaceRecog';
import Signin from './components/Signin/signin';
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
      route: 'signin',
      onSignIn : false,
      isSignedIn: false,
      user : {
        id: '',
        name: '',
        email: '',
        entries: '0',
        joined : ''
      }
    }
  }

  loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined : data.joined
      }})
      console.log(this.state.user)
    }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box : box});
  }

onButtonClick = () => {
  this.setState({imageUrl : this.state.inputText})
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.inputText)
    .then(response => {
      if(response){
        console.log("fired");
        fetch("http://localhost:3001/image", {
            method: "put",
            headers : {'content-Type' : 'application/json'},
            body : JSON.stringify({
                id : this.state.user.id
            })
        })
            .then(response=> response.json())
            .then(count => {
              console.log("response", count)
              this.setState(Object.assign(this.state.user, {entries: count} ))
            })
      }
     this.displayFaceBox(this.calculateFaceLocation(response))
     .catch(err => console.log(err));});
    }


 onInputChange = (x) => { 
  this.setState({inputText : x.target.value})
  }

  onRouteChange = (route) => {
    this.setState({route : route});
    if(route === "home") {
      this.setState({onSignIn : true })
    } else {
      this.setState({onSignIn : false})
    }
  }

  


  render() {
    return (
     
      <div className= "App"  > 
        <Particles 
        className = "particles"
        params={particlesOptions}
        />
        { this.state.route ==='home' ?
        <div>
          <div className= 'navbar'>
            <Logo /> 
            <Nav onRouteChange={this.onRouteChange} onSignIn={this.state.onSignIn}/> 
          </div>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange = {this.onInputChange} onButtonClick = {this.onButtonClick}/>
          <FaceRecog box = {this.state.box} imageUrl = {this.state.imageUrl}/>
        </div>
        : 
          this.state.route ==='signin' ?
          <div>
          <Nav onRouteChange={this.onRouteChange} onSignIn={this.state.onSignIn}/>
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          </div> 
          :
          <div>
          <Nav onRouteChange={this.onRouteChange} onSignIn={this.state.onSignIn}/>
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          </div>
        
        }
       
      </div>
    );
  }
}
export default App;
