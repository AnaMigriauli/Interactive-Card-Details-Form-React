import Container from "./Container";
import React from "react";
import Button from "./UI/Buttons";
import Card from "./Card";
import submitImg from "../assets/images/Path.svg";
import classes from "./ResultContainer.module.css";

const ResultCurd = (props) => {
  return (
    <Container>
      <Card state={props.state}></Card>
      <div className={classes.resultCard}>
        <div className={classes.circle}>
          <img src={submitImg} alt="submitImg" />
        </div>
        <h1>THANK YOU!</h1>
        <span>We have added your card details</span>
        <Button>Continue</Button>
      </div>
    </Container>
  );
};
export default ResultCurd;
