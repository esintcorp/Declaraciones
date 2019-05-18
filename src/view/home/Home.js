import React, { Component } from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'

// import '../../App.css';
import Header from '../../components/logic/Header';
import FormIconButton from '../../components/form/FormIconButton';
import FormIconInput from '../../components/form/FormIconInput';
import Iva from '../iva/Iva'

function NotDone() {
  return <h2>Work In Progress</h2>;
}

const Item = props => <button
  className="item"
  onClick={() => {
    console.info('props', props)

  }}
>
  {props.children}
</button>;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      questions: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSubmit(event) {
    const { history } = this.props;

    history.push({
      pathname: "/home"
    });
  }

  handleLogout() {
    const { history } = this.props;

    history.push({
      pathname: "/"
    });
    window.location.reload();
  }

  render() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <Header
          classNames="App-logo"
          afterLogout={this.handleLogout}
          history={history}
          logout
          profile
        />
          <section className="App-section App-section-authenticated">
            <div className="App-aside">
              {/* <Item history={history}>IVA</Item>
              <Item history={history}>Anexos</Item>
              <Item history={history}>Renta</Item> */}
              <NavLink to="/iva" className="item">IVA</NavLink>
              <NavLink to="/anexos" className="item">Anexos</NavLink>
              <NavLink to="/renta" className="item">Renta</NavLink>
            </div>
            <div className="home-div">
              <Route path="/iva" component={Iva} />
              <Route path="/anexos" component={NotDone} />
              <Route path="/renta" component={NotDone} />

            </div>
          </section>
      </React.Fragment>
    );
  }
}

export default Home;
