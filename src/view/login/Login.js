import React, { Component } from 'react';
import { string as yupString, object as yupObject } from "yup";

// import Select from 'react-select';
import '../../App.css';
import FormIconInput from '../../components/form/FormIconInput';
import FormIconCheckbox from '../../components/form/FormIconCheckbox';
import Form from '../../components/form/Form';
import {iDCardValidator} from '../../utility/IDCardValidator';

const typeOptions = [
  { value: 'nat', label: 'Persona Natural' },
  { value: 'jur', label: 'Persona Jurídica' },
  { value: 'obl', label: 'Obligada' }
]

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: "",
        userId: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name,
      value = event.target.value;
    // console.info('event.target.name', name);
    // console.info('event.target.value', value);
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
        endpoint="login"
        contentType="application/x-www-form-urlencoded"
        body={this.state.user}
        validationSchema={yupObject().shape({
          userId: yupString().required("Correo Electrónico es un campo requerido")
            .email("Correo Electrónico debe ser válido"),
          password: yupString().required("Contraseña es un campo requerido")
        })}
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
          style={{border: "none"}}
          name="idCard"
          type="checkbox"
          // min="0"
          // addClassNames="hide-spin-button"
          // placeholder="Cédula de identidad"
          value={this.state.user.rememberme || false}
          label="¿Recordar sesión?"
          onChange={this.handleChange}
          // iconName="id-card"
        />

      </Form>
    );
  }
}

export default Login;
