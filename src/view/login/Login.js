import React, { Component } from 'react';
import { string as yupString, object as yupObject } from "yup";

import '../../App.css';
import Header from '../../components/logic/Header';
import FormIconInput from '../../components/form/FormIconInput';
import FormIconCheckbox from '../../components/form/FormIconCheckbox';
import Form from '../../components/form/Form';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: "",
        userId: "",
        rememberMe: false
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name,
      value = event.target.value;

    this.setState( prevState => ({
      user :
        {
          ...prevState.user,
          [name]: value
        }
      })
    )
  }

  handleCheckChange(event) {
    let checked = event.target.checked;

    this.setState( prevState => ({
      user :
        {
          ...prevState.user,
          rememberMe: checked
        }
      })
    )
  }

  render() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <Header classNames="App-login-logo"/>
        <section className="App-section">
          <Form
            style={{width: '40vmin', minWidth: '40vmin'}}
            endpoint="login"
            contentType="application/x-www-form-urlencoded"
            body={this.state.user}
            validationSchema={yupObject().shape({
              userId: yupString().required("Correo Electrónico es un campo requerido")
                .email("Correo Electrónico debe ser válido"),
              password: yupString().required("Contraseña es un campo requerido")
            })}
            onSuccess={data=> {
              history.push({
                pathname: "/"
              });
              window.location.reload();
            }}
            submitButton
          >
            <FormIconInput
              name="userId"
              type="email"
              placeholder="Correo Electrónico"
              value={this.state.user.userId}
              onChange={this.handleChange}
              iconName="envelope"
            />
            <FormIconInput
              name="password"
              type="password"
              placeholder="Contraseña"
              value={this.state.user.password}
              onChange={this.handleChange}
              iconName="unlock"
            />
            <FormIconCheckbox
              style={{border: "none", marginTop: 0}}
              name="rememberMe"
              // min="0"
              // classNames="hide-spin-button"
              // placeholder="Cédula de identidad"
              value={this.state.user.rememberMe || false}
              rightLabel="¿Recordar sesión?"
              onChange={this.handleCheckChange}
              // iconName="id-card"
            />

          </Form>

        </section>
      </React.Fragment>
    );
  }
}

export default Login;
