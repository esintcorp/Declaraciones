import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import Header from "../../components/logic/Header";
import Iva from "../iva/Iva";
import Anexo from "../anexo/Anexo";

function NotDone() {
  return <h2>Work In Progress</h2>;
}

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
    const { history, location } = this.props;
    if (location.pathname === "/profile") return null;
    console.info("location", location);
    return (
      <React.Fragment>
        <Header
          classNames="App-logo"
          afterLogout={this.handleLogout}
          history={history}
          logout
          profile
          homeLink={location.pathname === "/profile"}
        />
        <section className="App-section App-section-authenticated">
          <div className="App-aside">
            <NavLink to="/iva" className="item">
              IVA
            </NavLink>
            <NavLink to="/anexos" className="item">
              Anexos Gastos Personales
            </NavLink>
            <NavLink to="/renta" className="item">
              Impuesto a la Renta
            </NavLink>
          </div>
          <div className="home-div">
            <Route path="/iva" component={Iva} />
            {/* http://www.sri.gob.ec/web/guest/detalle-noticias?idnoticia=620&marquesina=1
              https://www.eluniverso.com/noticias/2019/01/03/nota/7121898/sri-paso-paso-proyeccion-gasto-personales
            */}
            <Route path="/anexos" component={Anexo} />
            {/* https://www.jezl-auditores.com/index.php/tributario/101-tabla-de-impuesto-a-la-renta-ir-2019-personas-naturales-ecuador */}
            <Route path="/renta" component={NotDone} />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
