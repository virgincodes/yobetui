
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Countries from './components/country'
import Spin from './components/spin/index'
import './App.css'
function App() {
  return (<div>


    <Router>

      <Route path='/casino' component={Spin}  ></Route>
      <Route path='/countries' component={Countries} ></Route>

    </Router>


  </div>)
}
export default App;
