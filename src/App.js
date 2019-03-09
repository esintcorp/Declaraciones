import React, { Component } from 'react';
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

import './App.css';
import AppProvider from './components/logic/AppProvider';


library.add(faIgloo, faSignInAlt, faEnvelope, faUser, faUnlock, faUniversity, faIdCard,faExclamation)

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppProvider />
      </div>
    );
  }
}

export default App;
