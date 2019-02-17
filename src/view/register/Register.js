import React, { Component } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MyInput = props => (
  <div className="App-input">
    {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
    <span><FontAwesomeIcon icon={props.iconName} /></span>
    <input
      className="input-style"
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder ? props.placeholder : props.label}
    />
  </div>
);

const MySubmit = props => (
  <button className="App-button" onClick={props.onClick}>
    <span><FontAwesomeIcon icon="sign-in-alt" /></span>
  </button>
);

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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    console.info('USER: ' + this.state.user);
    let userData = this.state.user;

    fetch('http://localhost:8050/register',{
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(response => {
      console.info('response', response)
      response.json().then(data =>{
        console.log("Successful" + data);
      })
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: "column"
        }}
        // action="/"
        // method="post"
        // encType="application/json"
      >
        <MyInput
          name="email"
          placeholder="Correo Electrónico"
          value={this.state.user.email}
          handleChange={this.handleChange}
          iconName="envelope"
        />
        <MyInput
          name="password"
          placeholder="Contraseña"
          value={this.state.user.password}
          handleChange={this.handleChange}
          iconName="unlock"
        />
        <MyInput
          name="type"
          placeholder="Tipo de persona"
          value={this.state.user.type}
          handleChange={this.handleChange}
          iconName="university"
        />
        <MyInput
          name="firstName"
          placeholder="Nombres"
          value={this.state.user.firstName}
          handleChange={this.handleChange}
          iconName="user"
        />
        <MyInput
          name="lastName"
          placeholder="Apellidos"
          value={this.state.user.lastName}
          handleChange={this.handleChange}
          iconName="user"
        />
        <MyInput
          name="idCard"
          placeholder="Cédula de identidad"
          value={this.state.user.idCard}
          handleChange={this.handleChange}
          iconName="id-card"
        />
        <MySubmit onClick={this.handleSubmit}/>
      </form>
    );
  }
}

export default Register;
