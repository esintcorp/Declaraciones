import React from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addClassNames } from "../../utility/Util";

/**
 * Form Select Component with Icon
 * props:
 * ...
 */
const FormIconSelect = props => {
  const colourStyles = {
      control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
        ...styles,
        border: "0px",
        padding: "0",
        margin: 0,
        backgroundColor: "transparent",
        color: "white"
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? "orange"
          : isFocused
          ? "orange"
          : "transparent",
        color: isDisabled ? "#ccc" : "black",
        cursor: isDisabled ? "not-allowed" : "default",
        fontFamily: "Arial",
        fontSize: "13.33px"
      }),
      input: (styles, { data, isDisabled, isFocused, isSelected }) => ({
        ...styles,
        flex: 1,
        padding: "0 10px",
        color: props.style.color || "white",
        fontFamily: "Arial",
        fontSize: "13.33px"
      }),
      placeholder: styles => ({
        ...styles,
        padding: "0 10px",
        fontFamily: "Arial",
        fontSize: "13.33px"
      }),
      singleValue: (styles, { data }) => ({
        ...styles,
        padding: "0 10px",
        color: props.style.color || "white",
        fontFamily: "Arial",
        fontSize: "13.33px"
      })
    },
    addedClassNames = addClassNames("", props.classNames),
    idValue = props.idValue || "value",
    selectedValue = props.value && props.options.find(option => option[idValue] === props.value);

  return (
    <div className="App-input" style={props.style}>
      {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
      {props.iconName && (
        <span>
          <FontAwesomeIcon icon={props.iconName} />
        </span>
      )}
      <div className={addedClassNames}>
        <Select
          name={props.name}
          options={props.options}
          value={selectedValue || null}
          onChange={selected => {
            props.onChange(selected && selected.value);
          }}
          placeholder={props.placeholder}
          styles={colourStyles}
        />
      </div>
    </div>
  );
};

export default FormIconSelect;
