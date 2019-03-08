import React, { Component } from 'react';
import { string as yupString, object as yupObject } from "yup";

// import Select from 'react-select';
import '../../App.css';
import FormIconInput from '../../components/form/FormIconInput';
import FormIconSelect from '../../components/form/FormIconSelect';
import Form from '../../components/form/Form';
import {iDCardValidator} from '../../utility/IDCardValidator';

const typeOptions = [
  { value: 'nat', label: 'Persona Natural' },
  { value: 'jur', label: 'Persona Jurídica' },
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
    // console.info('event.target.name', name);
    // console.info('event.target.value', value);
    this.setState( prevState => ({ user :
        {
          ...prevState.user,
          [name]: value
        }
      })/*, () => console.log(this.state.user)*/)
  }

  handleSelectChange(selected) {
    console.info('selected', selected);
    this.setState( prevState => ({ user :
        {
          ...prevState.user,
          type: selected
        }
      }))
  }

  render() {
    const { history } = this.props;

    return (
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
              "${path} no es una cédula válida",
              value => iDCardValidator(value)
            )
            .length(10, "Cédula debe tener exáctamente ${length} caracteres")
            .required("Cédula es un campo requerido")
        })}
        onSuccess={() => {
          history.push("/");
        }}
        submitButton
      >
        <FormIconInput
          name="email"
          type="email"
          placeholder="Correo Electrónico"
          value={this.state.user.email}
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
        <FormIconSelect
          name="type"
          placeholder="Tipo de persona"
          value={this.state.user.type}
          options={typeOptions}
          onChange={this.handleSelectChange}
          iconName="university"
        />
        <FormIconInput
          name="firstName"
          placeholder="Nombres"
          value={this.state.user.firstName}
          onChange={this.handleChange}
          iconName="user"
        />
        <FormIconInput
          name="lastName"
          placeholder="Apellidos"
          value={this.state.user.lastName}
          onChange={this.handleChange}
          iconName="user"
        />
        <FormIconInput
          name="idCard"
          type="number"
          min="0"
          addClassNames="hide-spin-button"
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
