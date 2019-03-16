import React, { Component } from 'react';
import { string as yupString, object as yupObject } from "yup";

import '../../App.css';
import Header from '../../components/logic/Header';
import FormIconInput from '../../components/form/FormIconInput';
import FormIconSelect from '../../components/form/FormIconSelect';
import Form from '../../components/form/Form';
import {iDCardValidator} from '../../utility/Util';

const typeOptions = [
  { value: 'nat', label: 'Persona Natural' },
  // { value: 'jur', label: 'Persona Jurídica' },
  { value: 'obl', label: 'Obligada' }
]

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
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name,
      value = event.target.value;

    this.setState( prevState => ({ user :
        {
          ...prevState.user,
          [name]: value
        }
      })/*, () => console.log(this.state.user)*/)
  }

  handleSelectChange(selected) {
    this.setState( prevState => ({
      user :
        {
          ...prevState.user,
          type: selected
        }
      })
    )
  }

  render() {
    const { history } = this.props;

    return (
      <React.Fragment>
        <Header classNames="App-logo" />
        <section className="App-section">
          <Form
            endpoint="register"
            body={this.state.user}
            validationSchema={yupObject().shape({
              email: yupString().required("Correo Electrónico es un campo requerido")
                .email("Correo Electrónico debe ser válido"),
              password: yupString().required("Contraseña es un campo requerido"),
              firstName: yupString().required("Nombres es un campo requerido"),
              lastName: yupString().required("Apellidos es un campo requerido"),
              idCard: yupString()
                // Validate idCard & RUC inserted. https://medium.com/@bryansuarez/c%C3%B3mo-validar-c%C3%A9dula-y-ruc-en-ecuador-b62c5666186f
                // Library to do this can be: https://github.com/diaspar/validacion-cedula-ruc-ecuador
                // some code: https://www.jybaro.com/blog/cedula-de-identidad-ecuatoriana/
                .test(
                  "idCardValidator",
                  params => `${params.path} no es una cédula válida`,
                  value => iDCardValidator(value)
                )
                .length(10, params => `Cédula debe tener exáctamente ${params.length} caracteres`)
                .required("Cédula es un campo requerido")
            })}
            onSuccess={() => {
              history.push("/services");
            }}
            submitButton
          >
            <FormIconInput
              style={{justifyContent: 'space-between', flex: 1}}
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              value={this.state.user.email}
              onChange={this.handleChange}
              iconName="envelope"
              classNames="flex1"
            />
            <FormIconInput
              style={{justifyContent: 'space-between', flex: 1}}
              name="password"
              type="password"
              placeholder="Contraseña"
              value={this.state.user.password}
              onChange={this.handleChange}
              iconName="unlock"
              classNames="flex1"
            />
            <FormIconSelect
              style={{justifyContent: 'space-between', flex: 1}}
              name="type"
              placeholder="Tipo de persona"
              value={this.state.user.type}
              options={typeOptions}
              onChange={this.handleSelectChange}
              iconName="university"
            />
            <FormIconInput
              style={{justifyContent: 'space-between', flex: 1}}
              name="firstName"
              placeholder="Nombres"
              value={this.state.user.firstName}
              onChange={this.handleChange}
              iconName="user"
              classNames="flex1"
            />
            <FormIconInput
              style={{justifyContent: 'space-between', flex: 1}}
              name="lastName"
              placeholder="Apellidos"
              value={this.state.user.lastName}
              onChange={this.handleChange}
              iconName="user"
              classNames="flex1"
            />
            <FormIconInput
              style={{justifyContent: 'space-between', flex: 1}}
              name="idCard"
              type="number"
              min="0"
              classNames={["hide-spin-button", "flex1"]}
              placeholder="Cédula de identidad"
              value={this.state.user.idCard}
              onChange={this.handleChange}
              iconName="id-card"
            />

          </Form>
        </section>
      </React.Fragment>
    );
  }
}

export default Register;
