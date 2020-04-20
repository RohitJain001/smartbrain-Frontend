import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
//import Clarifai from 'clarifai';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import './App.css';

const initialState ={
  input:'',
  imgUrl:'',
  box:{},
  route:'signin',
  isSignedIn: false,
  user: {
      id:'',
      name:'',
      email:'',
      entries: 0,
      joined : ''
  }
}

const particlesSet={
    "particles": {
        "number": {
            "value": 150
        },
        "size": {
            "value": 3
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }// there was an error
}


 
 
class App extends Component {
  constructor(){
    super();
    this.state=initialState
  }

  calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol : width -(clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }

onInputChange=(e)=>{ 
  this.setState({input: e.target.value});
}

onButtonSubmit=()=>{
  this.setState({imgUrl : this.state.input});
  fetch('https://warm-reef-38212.herokuapp.com/imageurl', {
    method :'post',
    headers : { 'Content-Type':'application/json' }, 
    body : JSON.stringify({
      input : this.state.input
    })
  })
  .then(response => response.json())
  .then (response =>{
    if(response){
      fetch('https://warm-reef-38212.herokuapp.com/image', {
    method :'put',
    headers : { 'Content-Type':'application/json' }, 
    body : JSON.stringify({
      id : this.state.user.id
    })
  })
  .then(response => response.json())
  .then( count =>{
    this.setState(Object.assign( this.state.user, {entries : count} ))
  })
  .catch(console.log)
 }
 this.displayFaceBox(this.calculateFaceLocation(response))
})
 .catch(err => console.log(err))
}

onRouteChange=(route)=>{
  if(route==='signin' || route==='register'){
    this.setState({initialState})
  }else if(route==='home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route})
}

loadUser=(data)=>{
  this.setState({
    user : {
      id: data.id,
      name: data.name,
      email:data.email,
      entries: data.entries,
      joined : data.joined
  }
  })
}

  render() {
    return (
      <div className="App">
          <Particles className='particles'  params={particlesSet}/>
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
          { this.state.route==='home'
             ? <div>
             <Logo />
             <Rank name={this.state.user.name} entries={this.state.user.entries} />
             <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
             <FaceRecognition imgUrl={this.state.imgUrl} box={this.state.box} />
              </div>
             :
             (
               this.state.route==='signin'
               ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
               : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
             )
             
              }
       </div>
    );
  }
}

export default App;
