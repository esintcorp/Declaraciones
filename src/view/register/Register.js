import React, { Component } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MyInput = props => (
  <div className="App-input">
    {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
    <span><FontAwesomeIcon icon={props.iconName} /></span>
    <input class="input-style" name={props.name} placeholder={props.placeholder ? props.placeholder : props.label} />
  </div>
);

const MySubmit = props => (
  <button className="App-button" type="submit">
    <span><FontAwesomeIcon icon="sign-in-alt" /></span>
  </button>
);

class Register extends Component {
  render() {
    return (
      <form style={{
        display: 'flex',
        flexDirection: "column"
      }}>
        <MyInput
          name="email"
          placeholder="Correo Electrónico"
          iconName="envelope"
        />
        <MyInput
          name="password"
          placeholder="Contraseña"
          iconName="unlock"
        />
        <MyInput
          name="type"
          placeholder="Tipo de persona"
          iconName="university"
        />
        <MyInput
          name="firstName"
          placeholder="Nombres"
          iconName="user"
        />
        <MyInput
          name="lastName"
          placeholder="Apellidos"
          iconName="user"
        />
        <MyInput
          name="name"
          placeholder="Cédula de identidad"
          iconName="id-card"
        />
        <MySubmit />
      </form>
    );
  }
}

export default Register;
