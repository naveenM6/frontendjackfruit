import React, {useState} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';

import './index.css'


const Login = props => {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [errorMsg,showError] = useState(false);

    let displayMsg = null;

    const onSubmit = async event => {
        event.preventDefault();
        const url = "http://localhost:5004/login";
        const options = {
            headers:{
                "content-type": "application/json"
              },
            method: 'POST', 
            body: JSON.stringify(
                {userName: userName,password:password}
            )
        }
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if (response.ok === true){
            Cookies.set('jwt_token', data.jwtToken, {
                expires: 7,
                path: '/',
              })
              const {history} = props
              history.replace('/');
              showError(false);
        }else{
            showError(true);
            displayMsg = "Enter Details Correctly"
        }
    }

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return(
        <form className="login-container" onSubmit={onSubmit} value={{userName}}>
            <h1 className="login-title">LOG IN</h1>
            <input type="text" id="username" className="inputs" placeholder="username" onChange={event => setUserName(event.target.value)}/>
            <input type="text" id="password" className="inputs" placeholder="password" onChange={event => setPassword(event.target.value)}/>
            {errorMsg ? <p>{displayMsg}</p> : ""}
            <button type="submit" className="login-button">Login</button>
        </form>
    )
}

export default Login;