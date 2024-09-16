import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

import './App.css'
import './index.css'

const routes = (
  <Router>
    <Routes>
      <Route path="/"  element = { <Login /> } />
      <Route path="/dashboard"   element = { <Home /> }  />
      <Route path="/login"   element = { <Login /> }  />
      <Route path="/signup"   element = { <SignUp /> }  />



    </Routes>
  </Router>
);






function App() {


  return (
   <div>
   {routes}
   </div>
  )
}

export default App
