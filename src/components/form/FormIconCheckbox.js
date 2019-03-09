import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addClassNames } from '../../utility/Util';

/**
 * Form Input Component with Icon
 * props:
 * ...
 */

const FormIconCheckbox = ({ style, label, name, iconName, placeholder, classNames, value, ...restProps }) => {
  const addedClassNames = addClassNames("input-style", classNames);

  return (
    <div className="App-input" style={style}>
      <input
        {...restProps}
        checked={value}
        name={name}
        placeholder={placeholder || label}
        // autoComplete="off"
      />
      {label && <label htmlFor={name} className={addedClassNames}>{label}</label>}

      {iconName && <span><FontAwesomeIcon icon={iconName} /></span>}
    </div>
  );
};

export default FormIconCheckbox;
