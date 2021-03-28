import React, {useEffect} from "react";
import './App.css';
import Header from "./Header";
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login';
import Payment from './Payment';
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"

function App() {
  const promise = loadStripe (
    "pk_test_51IS4abLbH6VaedCHPAkFvzWkySYYIy9Ia5lmLaszrVDrgGNjsNQuYyhdnJv0GyyVKnBjNVeBlV2l4DjU35YuHx6o00mzIYyTI4"
  );

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    document.title = "Amazon Clone"
 }, []);

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS >>> ", authUser)
  
    if(authUser) {
      
      dispatch({
        type:'SET_USER',
        user:authUser
      })
    } else {
      dispatch({
        type:'SET_USER',
        user:null
      })
    }
  })
   
  }, [])

  return (
    //BEM
    <Router>
      <div className="App">
       
        <Switch>
          <Route path="/login">
          <Login />
          </Route>
          <Route path="/checkout">
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={promise}>
            <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
