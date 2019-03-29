import React, { Component } from 'react';
import { BrowserRouter as Router, Route/*, Link*/ } from "react-router-dom";

import '../../App.css';
import { isAuthenticated } from '../../components/logic/Authentication';
import Register from '../../view/register/Register';
import Login from '../../view/login/Login';
import Services from '../../view/services/Services';
import TermsAndConditions from '../../view/terms/TermsAndConditions';
import Payment from '../../view/payment/Payment';
import Home from '../../view/home/Home';

class AppProvider extends Component {
  render() {
    return (
      <Router>
        {(
          // TODO verify TOKEN against server session
          isAuthenticated() && (
            <React.Fragment>
              {/* Add here Authenticated components */}
              <Route exact path="/home" component={Home} />
            </React.Fragment>
          )
        ) || (
          <React.Fragment>
            {/* Add here Not Authenticated components */}
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/services" component={Services} />
            <Route path="/terms" component={TermsAndConditions} />
            <Route path="/payment" component={Payment} />
          </React.Fragment>
        )}
      </Router>

    );
  }
}

export default AppProvider;
