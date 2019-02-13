import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faIgloo,
  faSignInAlt,
  faEnvelope,
  faUser,
  faUnlock,
  faUniversity,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';

import logo from './assets/images/logo_transp.png';
import './App.css';
import Register from './view/register/Register';


library.add(faIgloo, faSignInAlt, faEnvelope, faUser, faUnlock, faUniversity, faIdCard)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section className="App-section">
          <Register />
        </section>
      </div>
    );
  }
}

export default App;
