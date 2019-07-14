import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch/*, Link*/ } from "react-router-dom";

import '../../App.css';
import Register from '../../view/register/Register';
import Login from '../../view/login/Login';
import Services from '../../view/services/Services';
import TermsAndConditions from '../../view/terms/TermsAndConditions';
import Payment from '../../view/payment/Payment';
import PaymentResult from '../../view/payment/PaymentResult';
import Home from '../../view/home/Home';
import Profile from '../../view/profile/Profile';
import { getToken } from './Authentication';
import { offlinePathnamesList, onlinePathnamesList } from '../../utility/Util';

class AppProvider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sessionInfo: {}
    };
  }


  componentDidMount() {
    fetch('http://localhost:8050/getSessionInfo', {
      method: "POST",
      mode: 'cors',
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': contentType
        'X-CSRF-TOKEN': getToken()
      },
      credentials: 'include'
    }).then(response => {
      response.json().then(data => {
        if (!response.ok || response.status !== 200) {

          if (!offlinePathnamesList.find(pathname => pathname === window.location.pathname)) {
            window.location.assign('http://localhost:3000')
          }

        } else {
          if (!onlinePathnamesList.find(pathname => pathname === window.location.pathname)) {
            window.location.assign('http://localhost:3000')
          }
          sessionStorage.setItem('user', JSON.stringify(data))
          this.setState({ sessionInfo: data });
        }
      }).catch(errors => {
        console.error(errors)
      });
      // if (response && response.ok) {
        // localStorage.setItem("csrfToken", undefined);
        // afterLogout();
        // console.info(getToken())
      // }
    }).catch(errorfetch => {
      console.error(errorfetch)
    });
  }

  render() {
    return (
      <Router>
        {
          this.state.sessionInfo.firstName ? (
            <Switch>
              {/* Add here Authenticated components */}
              <Route path="/" component={Home} />
              <Route path="/profile" component={Profile} />
            </Switch>
          ) : (
            <Switch>
              {/* Add here Not Authenticated components */}
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/services" component={Services} />
              <Route path="/terms" component={TermsAndConditions} />
              <Route path="/payment" component={Payment} />
              <Route path="/payment-result" component={PaymentResult} />
            </Switch>
          )
        }
      </Router>

    );
  }
}

export default AppProvider;
