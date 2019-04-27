import React, { Component } from 'react';

import logo from '../../assets/images/logo_transp.png';
import '../../App.css';
import { addClassNames } from '../../utility/Util';
import FormIconButton from '../form/FormIconButton';
import { getToken } from './Authentication';

class Header extends Component {
  profileFunction = () => {
    fetch('http://localhost:8050/getUser', {
      method: "POST",
      mode: 'cors',
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': contentType
        'X-CSRF-TOKEN': getToken()
      },
      credentials: 'include'
    }).then(response => {
      console.info(response)
    });
  }

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

      // if (response && response.ok) {
        localStorage.removeItem("csrfToken");
        afterLogout();
        console.info(getToken())
      // }
    });
  }

  render() {
    const { classNames, logout, profile } = this.props;
    const addedClassNames = addClassNames("App-logo", classNames),
      headerClass = logout ? 'App-header header-logout' : 'App-header';
    return (
      <header className={headerClass} >
        <img src={logo} className={addedClassNames} alt="logo" />
        <div style={{flex: 1}} />
        {profile && <FormIconButton
          style={{minWidth: '5vmin', margin: '0 0 0 15px', padding: 5, flex: 0}}
          iconName="user-circle"
          onClick={this.profileFunction}
        />}
        {logout && <FormIconButton
          style={{minWidth: '5vmin', margin: '0 20px 0 15px', padding: 5, flex: 0}}
          iconName="sign-out-alt"
          onClick={this.logoutFunction}
        />}
      </header>
    );
  }
}

export default Header;
