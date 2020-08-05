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
  const[loading, setLoading]=useState(false)
  const [products, setProducts] = useState(null)
  return (
    <div className="App">
       <Router>
       <Navbar thing={stuff} numPro={numPro} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} products={products} setProducts={setProducts}/>
         <Route exact path='/'component={Register} loading={loading} setLoading={loading}/>
         <Route path='/login'component={Login} loading={loading} setLoading={setLoading}/>
         {/* <PrivateRoute path='/dashboard' component={()=> <Dashboard setThing={setStuff} setNumPro={setNumPro} setIsLoggedIn={setIsLoggedIn}/>}/> */}
         <PrivateRoute path='/dashboard' component={Dashboard} setThing={setStuff} setNumPro={setNumPro} setIsLoggedIn={setIsLoggedIn} loading={loading} setLoading={setLoading} products={products} setProducts={setProducts}/>

        <Footer/>
       </Router>
       
    </div>

  );
}

export default App;
