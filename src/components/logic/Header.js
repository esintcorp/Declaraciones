import React, { Component } from 'react';

import logo from '../../assets/images/logo_transp.png';
import '../../App.css';
import { addClassNames } from '../../utility/Util';
import FormIconButton from '../form/FormIconButton';
import { getToken } from './Authentication';

class Header extends Component {

  logoutFunction = () => {
    const { afterLogout } = this.props;

    console.info('token:', getToken())
    fetch('http://localhost:8050/logout', {
      method: "POST",
      mode: 'cors',
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': contentType
        'X-CSRF-TOKEN': getToken()
      },
      credentials: 'include'
    }).then(response => {
      console.info('response', response)

      if (response && response.ok) {
        localStorage.setItem("csrfToken", undefined);
        afterLogout();
        console.info(getToken)
      }
    });
  }

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
          onClick={this.logoutFunction}
        />}
      </header>
    );
  }
}

export default Header;
