import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmpty } from 'lodash';

import '../../App.css';


const MySubmit = props => (
  <button className="App-button" onClick={props.onClick}>
    <span><FontAwesomeIcon icon="sign-in-alt" /></span>
  </button>
);
const ErrorDiv = props => (
  <div className="Form-errors-div" >
    <span><FontAwesomeIcon icon="exclamation" /></span>
    {Object.keys(props.errors).map(key => {
      return (<div className="field-error" key={key}>{props.errors[key]}</div>)
    })}
  </div>
);
const unflattenYupError = errors => {
  let result = {};

  errors.forEach(error => {
    console.info("HOLA ERROR", error)
    // result = setIn(result, error.path, error.type == "required" ? "requiredFieldError" : error.message);
    result = {
      ...result,
      [error.path]: error.message
    }
  });

  return result;
};

/**
 * Form Component
 * props:
 * body: Object to submit
 * children: Form fields
 * endpoint: Endpoint of the server which is going to receive and manipulate
 *           the body.
 * submitButton: true or false
 */
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { endpoint, body, validationSchema } = this.props;

    event.preventDefault();

    // return new Promise(resolve => {
    validationSchema.validate(body, { abortEarly: false, context: this.validationContext }).then(
      () => {

        console.info('BODY: ', body);

        fetch('http://localhost:8050/' + endpoint,{
          method: "POST",
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }).then(response => {
          console.info('response', response)
          response.json().then(data =>{
            console.log("Successful" + data);
          })
        });
      },
      validationError => {
        console.info("holaaaa erroooor", validationError)
        this.setState({errors: unflattenYupError(validationError.inner)})
        console.info("object", this.state.errors)
      }
    );
    // });
  }

  render() {
    const { children, submitButton } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: "column"
        }}
      >

        {children}
        {!isEmpty(this.state.errors) && <ErrorDiv errors={this.state.errors}/>}
        {submitButton && <MySubmit onClick={this.handleSubmit}/>}
      </form>
    );
  }
}

export default Form;
