import React, { Component } from 'react';

// import Select from 'react-select';
import '../../App.css';
import FormIconInput from '../../components/form/FormIconInput';
import FormIconSelect from '../../components/form/FormIconSelect';
import Form from '../../components/form/Form';

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
    console.info('event.target.name', name);
    console.info('event.target.value', value);
    this.setState( prevState => ({ user :
        {
          ...prevState.user,
          [name]: value
        }
      }), () => console.log(this.state.user))
  }

  handleSelectChange(selected) {
    console.info('selected', selected);
    this.setState( prevState => ({ user :
        {
          ...prevState.user,
          type: selected
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

        <FormIconInput
          name="email"
          placeholder="Correo Electrónico"
          value={this.state.user.email}
          onChange={this.handleChange}
          iconName="envelope"
        />
        <FormIconInput
          name="password"
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
        {/*<div className="App-input">
          <input list="browsers" name="browser" />
          <datalist id="browsers">
            <option value="Internet Explorer" />
            <option value="Firefox" />
            <option value="Chrome" />
            <option value="Opera" />
            <option value="Safari" />
          </datalist>
        </div>
        <FormIconInput
          name="type"
          placeholder="Tipo de persona"
          value={this.state.user.type}
          onChange={this.handleChange}
          iconName="university"
        />*/}
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
