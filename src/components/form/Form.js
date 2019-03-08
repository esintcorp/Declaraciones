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

  if (errors) {
    errors.forEach(error => {
      console.info("HOLA ERROR", error)
      // result = setIn(result, error.path, error.type == "required" ? "requiredFieldError" : error.message);
      result = {
        ...result,
        [error.path || error.field]: error.message || error.defaultMessage
      }
    });
  }

  return result;
};

const parametrizeJson = body => {
  return Object.entries(body).map(e => e.join('=')).join('&');
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
    const { endpoint, body, validationSchema, contentType = 'application/json', onSuccess = () => {} } = this.props;

    event.preventDefault();

    // return new Promise(resolve => {
    validationSchema.validate(body, { abortEarly: false, context: this.validationContext }).then(
      () => {

        console.info('BODY: ', body, endpoint);

        fetch('http://localhost:8050/' + endpoint, {
          method: "POST",
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': contentType
          },
          credentials: 'include',
          body: contentType === "application/json" ? JSON.stringify(body) : parametrizeJson(body)
        }).then(response => {
          console.info('response', response)

          response.json().then(data => {
            if (!response.ok || response.status !== 200) {
              this.setState({errors: unflattenYupError(data.errors)})
              console.info("object", this.state.errors, data)
            } else {
              console.log("Successful", data);
              if (typeof(Storage) !== "undefined" && data.token) {
                // Store
                localStorage.setItem("csrfToken", data.token);
                console.info('TOKEEEENNNN', localStorage.getItem("csrfToken"))
              } else if (data.message) {
                this.setState({errors: data})
                console.error(data.message)
              } else if (data.token) {
                console.error("Sorry, your browser does not support Web Storage...");
              } else {
                onSuccess()
              }
              this.setState({errors: {}})
            }
          }).catch(e => {
            console.info("eeerrrrooorr", e)
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
