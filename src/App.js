import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

import './App.css';

function App() {
  return (
   
    <div className="App">
      <h1>Amazon <h2>Price Tracker</h2></h1>
       <Router>
         <Route exact path='/'component={Register}/>
         <Route path='/login'component={Login}/>
         <Route path='/dashboard' component={Dashboard}/>
       </Router>
    </div>

  );
}

export default App;
