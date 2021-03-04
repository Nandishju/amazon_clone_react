import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase'

import './Login.css'

 function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,password)
        .then((auth) => {
            history.push('/')
        })
        .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();
        auth.
        createUserWithEmailAndPassword(email, password)
        .then((auth)=> {
            if(auth) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
    }

    return (
        <div className="login">
          <Link to="/">
             <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1600px-Amazon_logo.svg.png" />
          </Link>

          <div className="login__container">
              <h1>Sign-in</h1>
              <form>
                  <h5>E-mail</h5>
                  <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                  <h5>Password</h5>
                  <input type="password"  value={password} onChange={e =>  setPassword(e.target.value)} />

                  <button className="login__signInButton" type="submit" onClick={signIn}>Sign In</button>

                  <p>
                     By continuing, you agree to Amazon Fake Clone Conditions of Use and Privacy Notice.
                  </p>

                  <button className="login__registerButton" onClick={register}>Create your Amazon Account</button>
              </form>
          </div>
           
        </div>
    )
};

export default Login
