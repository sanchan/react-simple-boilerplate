import React, { Component } from 'react'
import Home from 'components/Home'
import Contact from 'components/Contact'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom"

  class App extends Component {
      render() {
          return (
            <Router>
              <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>

              <Route exact path="/" component={Home} />
              <Route path="/contact" component={Contact} />
            </Router>
          )
      }
  }

  export default App
