import React,{Component} from 'react';
import {  Button } from '@material-ui/core';

class Login extends Component {
    // state= {showLoginForm: false}
    //state ={showSignUpForm: false}

     showLoginForm = () => {
        return (
        //     <div className="showLoginForm"> 
        //         <form id= "add-app">
 
        //             <label>Username </label>
        //             <input type="text"> </input>
 
        //             <label> Password</label>
        //             <input type="text" ></input>
 
        //             <button>Login</button>
        //        </form>
        //    </div>
       console.log("login form")
        );
    }
    showSignUpForm = () => {
        return (
            <div> 
                <form id= "add-app">
 
                    <label>Username </label>
                    <input type="text"> </input>

                    <label>Email </label>
                    <input type="text"> </input>

                    <label> Password</label>
                    <input type="password" ></input>
 
                    <button>SignUp</button>
               </form>
           </div>
        );
    }

    render(){
        return (
            <div className="Login">
                <Button onClick={ this.showLoginForm }>Login</Button>
                <Button onClick={() => this.setState({showSignUpForm: true}) }>SignUp</Button>
            </div>
        )
    }
    
}

export default Login
