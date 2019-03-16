import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addClassNames } from '../../utility/Util';

/**
 * Form Input Component with Icon
 * props:
 * ...
 */

const FormIconRadio = ({ style, leftLabel, rightLabel, name, iconName, placeholder, classNames,...restProps }) => {
  const addedClassNames = addClassNames("input-style", classNames);

  return (
    <div className="App-input" style={style}>
      {iconName && <span><FontAwesomeIcon icon={iconName} /></span>}

      {leftLabel && <label htmlFor={name} className={addedClassNames}>{leftLabel}</label>}

      <input
        {...restProps}
        // checked={value}
        name={name}
        // value={name}
        type="radio"
        placeholder={placeholder || rightLabel || leftLabel}
        // autoComplete="off"
      />

      {rightLabel && <label htmlFor={name} className={addedClassNames}>{rightLabel}</label>}

    </div>
  );
};

export default FormIconRadio;
