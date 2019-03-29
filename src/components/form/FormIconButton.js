import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormIconButton = props => (
  <button style={props.style} className="App-button" onClick={props.onClick}>
    <span><FontAwesomeIcon icon={props.iconName || "sign-in-alt"} size={props.iconSize} /></span>
  </button>
);

export default FormIconButton;
