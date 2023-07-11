import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={props.className}>
      <div>
        <label>{props.label}</label>
        {props.cardIsValid && <p>Wrong format, numbers only</p>}
      </div>
      <input
        name={props.name}
        className={
          props.nameIsValid ||
          props.monthIsValid ||
          props.yearIsValid ||
          props.cvcIsValid ||
          props.cardIsValid
            ? classes["error-boder"]
            : ""
        }
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        autoComplete={props.autoComplete}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></input>
    </div>
  );
};

export default Input;
