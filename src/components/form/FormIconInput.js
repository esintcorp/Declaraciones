import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Form Input Component with Icon
 * props:
 * ...
 */

const FormIconInput = ({ label, name, iconName, placeholder, addClassNames, ...restProps }) => {
  let classNames = "input-style";

  if (typeof(addClassNames) === "string") {
    classNames += " " + addClassNames;
  } else if (addClassNames) {
    addClassNames.forEach(className => {
      classNames += " " + className;
    })
  }

  return (
    <div className="App-input">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <span><FontAwesomeIcon icon={iconName} /></span>
      <input
        {...restProps}
        name={name}
        className={classNames}
        placeholder={placeholder || label}
        // autoComplete="off"
      />
    </div>
  );
};

export default FormIconInput;
