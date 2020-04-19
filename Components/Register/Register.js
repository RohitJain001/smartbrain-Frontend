import React from 'react';
//import './Signin.css';


class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      registerName:"",
      registerEmail:"",
      registerPassword: ""
    }
  }

  onRegisterNameChange=(e)=>{
    this.setState({registerName :e.target.value })
  }

  onRegisterEmailChange=(e)=>{
    this.setState({registerEmail :e.target.value })
  }

  onRegisterPasswordChange=(e)=>{
    this.setState({registerPassword :e.target.value })
  }

  onRegisterButtonClick=()=>{
    fetch('http://localhost:3000/register', {
      method : 'post',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password : this.state.registerPassword
      }) 
  })
    .then(response => response.json())
    .then(user => {
      if(user.id){
        this.props.loadUser(user)
        this.props.onRouteChange('home')
    }
    })
}

  render(){
    return(
    <article className="br3 ba b--black-10 mv4 w-50 w-50-m w-25-l shadow-5 mw6 center">    
        <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
              <input onChange={this.onRegisterNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input onChange={this.onRegisterEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input onChange={this.onRegisterPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="">
            <input onClick={this.onRegisterButtonClick}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value="Register" />
          </div>
        </form>
      </main>
    </article>  
    );
}
}

export default Register;