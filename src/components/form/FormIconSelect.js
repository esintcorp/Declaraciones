import React from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// const Option = props => {
//   <option value={props.value} />
// };
/**
 * Input Form Component
 * props:
 * ...
 */
// const IconFormInput = props => (
//   <div className="App-input">
//     {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
//     <span><FontAwesomeIcon icon={props.iconName} /></span>
//     <input
//       className="input-style"
//       name={props.name}
//       value={props.value}
//       onChange={props.onChange}
//       placeholder={props.placeholder ? props.placeholder : props.label}
//       // autoComplete="off"
//     />
//   </div>
// );
const colourStyles = {
  control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    border: '0px',
    padding: '0',
    margin: 0,
    backgroundColor: 'transparent',
    color: 'white'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? null
      : isSelected ? 'orange' : isFocused ? 'orange' : 'transparent',
    color: isDisabled
      ? '#ccc'
      : 'black',
    cursor: isDisabled ? 'not-allowed' : 'default',
    fontFamily: 'Arial',
    fontSize: '13.33px'
  }),
  input: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    flex: 1,
    padding: '0 10px',
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '13.33px'
  }),
  placeholder: styles => ({
    ...styles,
    padding: '0 10px',
    fontFamily: 'Arial',
    fontSize: '13.33px'
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    padding: '0 10px',
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '13.33px'
  }),
};

/**
 * Form Select Component with Icon
 * props:
 * ...
 */
const FormIconSelect = props => {
  const selectedValue = props.value && props.options.find(option => option.value === props.value);
  return (
    <div className="App-input">
      {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
      {props.iconName && <span><FontAwesomeIcon icon={props.iconName} /></span>}
      <div style={{flex:1}}>
        <Select
          name={props.name}
          options={props.options}
          value={selectedValue || null}
          onChange={selected => {
            props.onChange(selected && selected.value)
          }}
          placeholder={props.placeholder}
          styles={colourStyles}
        />
      </div>
    </div>
  )
};

export default FormIconSelect;
