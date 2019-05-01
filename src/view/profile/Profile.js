import React, { Component } from 'react';
import { string as yupString, object as yupObject } from "yup";

import Header from '../../components/logic/Header';
import FormIconInput from '../../components/form/FormIconInput';
import FormIconSelect from '../../components/form/FormIconSelect';
import Form from '../../components/form/Form';
import Title from '../../components/title/Title';
import { iDCardValidator, personTypeOptions } from '../../utility/Util';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(sessionStorage.getItem("user"))
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  handleLogout() {
    const { history } = this.props;

    history.push({
      pathname: "/"
    });
    window.location.reload();
  }

  render() {
    const { history } = this.props,
      inputStyle = {
        flexDirection: 'row',
        // alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 10,
        border: 'none'
      };

    return (
      <React.Fragment>
        <Header
          classNames="App-logo"
          afterLogout={this.handleLogout}
          history={history}
          logout
        />
        <section className="App-section">
          <Form
            endpoint="saveProfile"
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
                  params => `${params.value} no es una cédula válida`,
                  value => iDCardValidator(value)
                )
                .length(10, params => `Cédula debe tener exáctamente ${params.length} caracteres`)
                .required("Cédula es un campo requerido"),
              rucNumber: yupString().nullable()/*.when('idCard', (idCard, schema) => {
                return idCard ? schema : schema.required("Apellidos es un campo requerido");
              })*/
            })}
            onSuccess={data=> {
              history.push({
                pathname: "/",
                // state: {
                //   dataPeriod: data,
                //   user: this.state.user
                // }
              });
            }}
            submitButton
          >
            <Title>Perfil</Title>
            <div>
              <FormIconInput
                label="Nombres"
                style={{...inputStyle, marginTop: 0}}
                name="firstName"
                placeholder="Nombres"
                value={this.state.user.firstName}
                onChange={this.handleChange}
                // iconName="user"
                classNames="profile-input"
              />
              <FormIconInput
                label="Apellidos"
                style={inputStyle}
                name="lastName"
                placeholder="Apellidos"
                value={this.state.user.lastName}
                onChange={this.handleChange}
                // iconName="user"
                classNames="profile-input"
              />
              <FormIconInput
                label="Correo Electrónico"
                style={inputStyle}
                name="email"
                type="email"
                placeholder="Correo Electrónico"
                value={this.state.user.email}
                onChange={this.handleChange}
                // iconName="envelope"
                classNames="profile-input"
              />
              <FormIconInput
                label="Contraseña"
                style={inputStyle}
                name="password"
                type="password"
                value={this.state.user.password}
                onChange={this.handleChange}
                // iconName="unlock"
                classNames="profile-input"
              />
              <FormIconInput
                label="Cédula de identidad"
                style={inputStyle}
                name="idCard"
                type="number"
                classNames={["hide-spin-button", "profile-input"]}
                placeholder="Cédula de identidad"
                value={this.state.user.idCard}
                onChange={this.handleChange}
                // iconName="id-card"
              />
              <FormIconInput
                label="Número de RUC"
                style={inputStyle}
                name="rucNumber"
                classNames={["hide-spin-button", "profile-input"]}
                placeholder="Número de RUC"
                value={this.state.user.rucNumber}
                onChange={this.handleChange}
                // iconName="id-card-alt"
              />
            </div>
            <FormIconSelect
              label="Tipo de persona"
              style={inputStyle}
              name="type"
              placeholder="Tipo de persona"
              value={this.state.user.type}
              options={personTypeOptions}
              onChange={this.handleSelectChange}
              // iconName="university"
              classNames="profile-input"
            />
            <FormIconInput
              style={{justifyContent: 'space-between', flex: 1}}
              name="sriUsername"
              min="0"
              classNames={["hide-spin-button", "flex1"]}
              placeholder="Usuario de SRI"
              value={this.state.user.sriUsername}
              onChange={this.handleChange}
              iconName="id-card-alt"
            />
            <FormIconInput
              style={{justifyContent: 'space-between', flex: 1}}
              name="sriPassword"
              type="number"
              min="0"
              classNames={["hide-spin-button", "flex1"]}
              placeholder="Clave SRI"
              value={this.state.user.sriPassword}
              onChange={this.handleChange}
              iconName="id-card-alt"
            />

          </Form>
        </section>
      </React.Fragment>
    );
  }
}

export default Profile;
