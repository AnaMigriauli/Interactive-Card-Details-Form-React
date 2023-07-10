import React from "react";
import classes from "./Buttons.module.css";
const Button = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type}
      disabled={props.disabled}
      // onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
