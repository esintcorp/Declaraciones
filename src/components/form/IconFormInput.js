import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Input Form Component
 * props:
 * ...
 */
const IconFormInput = props => (
  <div className="App-input">
    {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
    <span><FontAwesomeIcon icon={props.iconName} /></span>
    <input
      className="input-style"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder ? props.placeholder : props.label}
      // autoComplete="off"
    />
  </div>
);

export default IconFormInput;
