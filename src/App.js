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
  faIdCardAlt,
  faExclamation,
  faCheckSquare,
  faClipboardCheck,
  faSignOutAlt,
  faCheckCircle,
  faUserCircle,
  faList,
  // faFacebookF,
  // faWhatsapp,
  // faInstagram
} from '@fortawesome/free-solid-svg-icons';

import './App.css';
import AppProvider from './components/logic/AppProvider';


library.add(faIgloo, faSignInAlt, faEnvelope, faUser, faUnlock, faUniversity,
  faIdCard, faIdCardAlt, faExclamation, faCheckSquare, faClipboardCheck,
  faSignOutAlt, faCheckCircle, faUserCircle, faList
  // , faFacebookF, faWhatsapp, faInstagram
)

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
