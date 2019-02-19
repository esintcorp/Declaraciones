import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../App.css';


const MySubmit = props => (
  <button className="App-button" onClick={props.onClick}>
    <span><FontAwesomeIcon icon="sign-in-alt" /></span>
  </button>
);


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

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { endpoint, body } = this.props;

    event.preventDefault();
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

        {submitButton && <MySubmit onClick={this.handleSubmit}/>}
      </form>
    );
  }
}

export default Form;
