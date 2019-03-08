import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Form Input Component with Icon
 * props:
 * ...
 */

const FormIconCheckbox = ({ style, label, name, iconName, placeholder, addClassNames, value, ...restProps }) => {
  let classNames = "input-style";

  if (typeof(addClassNames) === "string") {
    classNames += " " + addClassNames;
  } else if (addClassNames) {
    addClassNames.forEach(className => {
      classNames += " " + className;
    })
  }

  return (
    <div className="App-input" style={style}>
      <input
        {...restProps}
        checked={value}
        name={name}
        placeholder={placeholder || label}
        // autoComplete="off"
      />
      {label && <label htmlFor={name} className={classNames}>{label}</label>}

      {iconName && <span><FontAwesomeIcon icon={iconName} /></span>}
    </div>
  );
};

export default FormIconCheckbox;
