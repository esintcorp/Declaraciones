import React, { Component } from 'react';

import logo from '../../assets/images/logo_transp.png';
import '../../App.css';
import { addClassNames } from '../../utility/Util';

class Header extends Component {
  render() {
    const { classNames } = this.props;
    const addedClassNames = addClassNames("App-logo", classNames);
    return (
      <header className="App-header">
        <img src={logo} className={addedClassNames} alt="logo" />
      </header>
    );
  }
}

export default Header;
