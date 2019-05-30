import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import logo from '../../assets/images/logo_transp.png';
import '../../App.css';
import { addClassNames } from '../../utility/Util';
import FormIconButton from '../form/FormIconButton';
import { getToken } from './Authentication';

class Header extends Component {
  profileFunction = () => {
    const { history } = this.props;

    console.info(JSON.parse(sessionStorage.getItem('user')), history)
    history.push({
      pathname: "/profile"
    });
    // fetch('http://localhost:8050/getUser', {
    //   method: "POST",
    //   mode: 'cors',
    //   headers: {
    //     // 'Accept': 'application/json',
    //     // 'Content-Type': contentType
    //     'X-CSRF-TOKEN': getToken()
    //   },
    //   credentials: 'include'
    // }).then(response => {
    //   console.info('response', response)
    //   response.json().then(data => {
    //     if (!response.ok || response.status !== 200) {
    //       console.error(response)
    //     } else {
    //       console.info("object", data)
    //       // sessionStorage.setItem('user', data)
    //     }
    //   }).catch(errors => {
    //     console.error(errors)
    //   })
    //   // if (response && response.ok) {
    //     // localStorage.setItem("csrfToken", undefined);
    //     // afterLogout();
    //     // console.info(getToken())
    //   // }
    // }).catch(errorfetch => {
    //   console.error(errorfetch)
    // });
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
    const { classNames, logout, profile, homeLink } = this.props;
    const addedClassNames = addClassNames("App-logo", classNames),
      headerClass = logout ? 'App-header header-logout' : 'App-header';
      console.info('homeLink', homeLink)
    return (
      <header className={headerClass} >
        {homeLink && <NavLink to="/"><img src={logo} className={addedClassNames} alt="logo" /></NavLink>}
        <img src={logo} className={addedClassNames} alt="logo" />
        <div style={{flex: 1}} />
        {profile && <FormIconButton
          style={{minWidth: '5vmin', margin: '0 0 0 15px', padding: '10px 20px', flex: 0}}
          iconName="user-circle"
          // iconSize="2x"
          onClick={this.profileFunction}
        />}
        {logout && <FormIconButton
          style={{minWidth: '5vmin', margin: '0 20px 0 15px', padding: '10px 20px', flex: 0}}
          iconName="sign-out-alt"
          // iconSize="2x"
          onClick={this.logoutFunction}
        />}
      </header>
    );
  }
}

export default Header;
