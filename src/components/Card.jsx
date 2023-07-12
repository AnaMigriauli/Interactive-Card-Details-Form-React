import React from "react";
import classes from "./Card.module.css";
import circles from "../assets/images/Group 8.svg";
import lines from "../assets/images/Group 15.svg";

const Card = (props) => {
  return (
    <div className={classes.header}>
      <div className={classes.mask1}>
        <div className={classes["mask-rectangle"]}></div>
        <div className={classes["mask-cvc"]}>
          {props.state.cvc ? props.state.cvc : "000"}
        </div>
        <img className={classes.lines} src={lines} alt="lines" />
      </div>
      <div className={classes.mask2}>
        <img className={classes.circles} src={circles} alt="circles" />
        <div className={classes["mask-card-number"]}>
          {props.state.curdNumber
            ? props.state.curdNumber
            : "0000 0000 0000 0000"}
        </div>
        <div className={classes["mask-info"]}>
          <p className={classes["mask-cardholder"]}>
            {props.state.name ? props.state.name : "JANE APPLESEED"}
          </p>
          <div>
            <span className={classes["mask-data"]}>
              {props.state.month ? `${props.state.month}/` : "00/"}
            </span>

            <span className={classes["mask-data"]}>
              {props.state.year ? `${props.state.year}` : "00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
