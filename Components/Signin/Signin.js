import React from 'react';
//import './Signin.css';

class Signin extends React.Component{
      constructor(props){
        super(props);
        this.state={
          signinEmail:"",
          signinPassword:""
        }
      }

      onSigninEmailChange=(event)=>{
        this.setState({signinEmail :event.target.value})
      }

      onSigninPasswordChange=(event)=>{
        this.setState({signinPassword : event.target.value})
      }

      onButtonClickSignin=()=>{
        fetch('https://warm-reef-38212.herokuapp.com' , {
          method : 'post',
          headers : {'Content-Type' : 'application/json'},
          body:JSON.stringify({
            email: this.state.signinEmail,
            password: this.state.signinPassword
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
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="email" 
              name="email-address"  
              id="email-address" 
              onChange={this.onSigninEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password" 
              name="password"  
              id="password" 
              onChange={this.onSigninPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input onClick={this.onButtonClickSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
          </div>
          <div className="lh-copy mt3">
            <p onClick={()=>this.props.onRouteChange('register')} className="f6 link dim black pointer db">Register</p>
          </div>
        </div>
      </main>
    </article>  
    );
}
}

export default Signin;