import React, { Component } from 'react';
import { BrowserRouter as Router, Route/*, Link*/ } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faIgloo,
  faSignInAlt,
  faEnvelope,
  faUser,
  faUnlock,
  faUniversity,
  faIdCard,
  faExclamation
} from '@fortawesome/free-solid-svg-icons';

import logo from './assets/images/logo_transp.png';
import './App.css';
import Register from './view/register/Register';


library.add(faIgloo, faSignInAlt, faEnvelope, faUser, faUnlock, faUniversity, faIdCard,faExclamation)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section className="App-section">
          <Router>
            <div>
              {/*<Route exact path="/" component={Home} />*/}
              <Route path="/register" component={Register} />
            </div>
          </Router>

        </section>
      </div>
    );
  }
}

export default App;
