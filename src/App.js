
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Countries from './components/country'
import Multicountry from './components/countrymultiple'
import Spin from './components/spin'
import './App.css'
import Main  from './components/main'
function App() {
  return (<div>


    <Router>

      <Route path='/' exact component={Main}  ></Route>
      <Route path='/casino' component={Spin}  ></Route>
      <Route path='/countries' component={Countries} ></Route>
      <Route path='/multicountries' component={Multicountry} ></Route>

    </Router>


  </div>)
}
export default App;
