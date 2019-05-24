import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addClassNames } from '../../utility/Util';

/**
 * Form Input Component with Icon
 * props:
 * ...
 */

const FormIconInput = ({ style, label, name, iconName, placeholder, classNames, ...restProps }) => {
  const addedClassNames = addClassNames("input-style", classNames);

  return (
    <div className="App-input" style={style}>
      {label ? <label htmlFor={name}>{label}</label> : null}
      {iconName && <span><FontAwesomeIcon icon={iconName} /></span>}
      <input
        {...restProps}
        name={name}
        className={addedClassNames}
        placeholder={placeholder}
        // autoComplete="off"
      />
    </div>
  );
};

export default FormIconInput;
