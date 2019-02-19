import React, { Component } from 'react';

import '../../App.css';
import IconFormInput from '../../components/form/IconFormInput';
import Form from '../../components/form/Form';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        status: "active",
        password: "",
        type: "",
        idCard: "",
        rucNumber: "111",
        firstName: "",
        lastName: "",
        email: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name,
      value = event.target.value;
    console.info('event.target.name', name);
    console.info('event.target.value', value);
    this.setState( prevState => ({ user :
        {
          ...prevState.user,
          [name]: value
        }
      }), () => console.log(this.state.user))
  }

  render() {
    return (
      <Form
        endpoint="register"
        body={this.state.user}
        submitButton
      >
        <IconFormInput
          name="email"
          placeholder="Correo Electrónico"
          value={this.state.user.email}
          onChange={this.handleChange}
          iconName="envelope"
        />
        <IconFormInput
          name="password"
          placeholder="Contraseña"
          value={this.state.user.password}
          onChange={this.handleChange}
          iconName="unlock"
        />
        <IconFormInput
          name="type"
          placeholder="Tipo de persona"
          value={this.state.user.type}
          onChange={this.handleChange}
          iconName="university"
        />
        <IconFormInput
          name="firstName"
          placeholder="Nombres"
          value={this.state.user.firstName}
          onChange={this.handleChange}
          iconName="user"
        />
        <IconFormInput
          name="lastName"
          placeholder="Apellidos"
          value={this.state.user.lastName}
          onChange={this.handleChange}
          iconName="user"
        />
        <IconFormInput
          name="idCard"
          placeholder="Cédula de identidad"
          value={this.state.user.idCard}
          onChange={this.handleChange}
          iconName="id-card"
        />
      </Form>
    );
  }
}

export default Register;
