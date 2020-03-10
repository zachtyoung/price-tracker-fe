import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import PrivateRoute from './utils/PrivateRoute'
import {Navbar} from './components/Navbar'
import {Footer} from './components/Footer'
import './App.css';




function App() {
  const [stuff, setStuff] =useState(null)
  const [numPro, setNumPro] =useState(null)
  const[isLoggedIn, setIsLoggedIn] =useState(false)
  return (
    <div className="App">
       <Router>
       <Navbar thing={stuff} numPro={numPro} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
         <Route exact path='/'component={Register}/>
         <Route path='/login'component={Login}/>
         {/* <PrivateRoute path='/dashboard' component={()=> <Dashboard setThing={setStuff} setNumPro={setNumPro} setIsLoggedIn={setIsLoggedIn}/>}/> */}
         <PrivateRoute path='/dashboard' component={Dashboard} setThing={setStuff} setNumPro={setNumPro} setIsLoggedIn={setIsLoggedIn}/>

       {/* <Footer/> */}
       </Router>
    </div>

  );
}

export default App;
