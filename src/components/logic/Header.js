import React, { Component } from 'react';

import logo from '../../assets/images/logo_transp.png';
import '../../App.css';
import { addClassNames } from '../../utility/Util';
import FormIconButton from '../form/FormIconButton';

class Header extends Component {
  render() {
    const { classNames, logout } = this.props;
    const addedClassNames = addClassNames("App-logo", classNames),
      headerClass = logout ? 'App-header header-logout' : 'App-header';
    return (
      <header className={headerClass} >
        <img src={logo} className={addedClassNames} alt="logo" />
        {logout && <FormIconButton
          style={{width: '5vmin', margin: '0 15px', padding: 5, flex: 0}}
          iconName="sign-out-alt"
          // onClick={}
        />}
      </header>
    );
  }
}

export default Header;
