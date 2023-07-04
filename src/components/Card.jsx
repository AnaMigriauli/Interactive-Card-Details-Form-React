import React from "react";
import classes from "./Card.module.css";
import circles from "../assets/images/Group 8.svg";
const Card = (props) => {
  return (
    <div className={classes.header}>
      <div className={classes.mask1}>
        <div className={classes["mask-rectangle"]}></div>
        <div className={classes["mask-cvc"]}>
          {props.isSubmit ? props.state.cvc : "000"}
        </div>
      </div>
      <div className={classes.mask2}>
        <img src={circles} alt="circles" />
        <div className={classes["mask-card-number"]}>
          {props.isSubmit ? props.state.curdNumber : "0000 0000 0000 0000"}
        </div>
        <div className={classes["mask-info"]}>
          <p className={classes["mask-cardholder"]}>
            {props.isSubmit ? props.state.name : "JANE APPLESEED"}
          </p>
          <p className={classes["mask-data"]}>
            {props.isSubmit
              ? `${props.state.month}/${props.state.year}`
              : "00/00"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
