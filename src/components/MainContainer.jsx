import { useState, useReducer } from "react";
import Button from "./UI/Buttons";
import submitImg from "../assets/images/Path.svg";
import classes from "./MainContainer.module.css";
import Card from "./Card";
import Container from "./Container";

const INITIAL_STATE = {
  name: "",
  curdNumber: "",
  month: "",
  year: "",
  cvc: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      return state;
  }
};
const INITIAL_VALIDATION_STATE = {
  // nameErrors: false,
  cardErrors: false,
  monthErrors: false,
  yearErrors: false,
  cvcErrors: false,
};
const formValidityReducer = (state, action) => {
  // console.log(action);
  let isValid = false;
  // const letters = /[a-z]/gi;
  const simbols = /[!@#$%^&*(),.?":{}|<>]/g;

  switch (action.typeof) {
    case "CARD_ERROR":
      isValid = simbols.test(action.payload) ? false : true;
      return {
        ...state,
        cardErrors: !isValid,
      };
    case "MONTH_ERROR":
      console.log(action.payload);
      isValid = action.payload.trim().length === 0 ? true : false;
      return {
        ...state,
        monthErrors: !isValid,
      };
    default:
      return state;
  }
};
const MainContainer = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const [formValidityState, dispatchFormValidity] = useReducer(
    formValidityReducer,
    INITIAL_VALIDATION_STATE
  );

  // const [cardErrors, setCardErrors] = useState(false);
  // const [errors, setErrors] = useState(false);
  // const [yearErrors, setYearErrors] = useState(false);
  // const [cvcErrors, setCvcErrors] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const validityFunction = (e) => {
    dispatchFormValidity(
      {
        typeof: "CARD_ERROR",
        payload: state.curdNumber,
      },
      { typeof: "MONTH_ERROR", payload: state.month }
    );
  };

  console.log(state.month.trim().length);
  const inputChangeHandler = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });

    validityFunction();
  };

  console.log(state);
  console.log(formValidityState);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      state.name.trim().length !== 0
      // !cardErrors &&
      // !errors &&
      // !yearErrors &&
      // !cvcErrors
    ) {
      setIsSubmit(true);
    }
  };

  // const letters = /[a-z]/gi;
  // const simbols = /[!@#$%^&*(),.?":{}|<>]/g;

  // if (simbols.test(state.curdNumber) && letters.test(state.curdNumber)) {
  //   setCardErrors(true);
  // }
  // console.log(state.curdNumber);
  // if (+state.month.length === 0) {
  //   setErrors(true);
  // }

  // if (+state.year.length === 0) {
  //   setYearErrors(true);
  // }

  // if (+state.cvc.length === 0) {
  //   setCvcErrors(true);
  // }

  const CurdNumberFormat = (value) => {
    let formattedText = value.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }
    return formattedText.length > 1 ? formattedText : value;
  };

  return (
    <div>
      {!isSubmit ? (
        <Container>
          <Card state={state}></Card>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes["cardholder"]}>
              <label>Cardholder Name</label>
              <input
                name="name"
                type="text"
                placeholder="e.g. Jane Appleseed"
                autoComplete="off"
                value={state.name}
                onChange={inputChangeHandler}
              ></input>
            </div>
            <div className={classes["curd-number"]}>
              <div>
                <label>Card Number</label>
                {formValidityState.cardErrors && (
                  <p>Wrong format, numbers only</p>
                )}
              </div>
              <input
                name="curdNumber"
                className={
                  formValidityState.cardErrors ? classes["error-boder"] : ""
                }
                placeholder="e.g. 1234 5678 9123 0000"
                maxLength={19}
                autoComplete="off"
                value={CurdNumberFormat(state.curdNumber)}
                onChange={inputChangeHandler}
              ></input>
            </div>

            <div className={classes["exp-date"]}>
              <div className={classes.data}>
                <label>Exp. Date (MM/YY)</label>
                <div className={classes.input}>
                  <input
                    name="month"
                    className={
                      formValidityState.monthErrors
                        ? classes["error-boder"]
                        : ""
                    }
                    // type="number"
                    placeholder="MM"
                    maxLength={2}
                    autoComplete="off"
                    value={state.expData}
                    onChange={inputChangeHandler}
                    onBlur={validityFunction}
                  ></input>
                  <input
                    name="year"
                    // className={
                    //   formValidityState.yearErrors ? classes["error-boder"] : ""
                    // }
                    type="year"
                    maxLength={4}
                    placeholder="YY"
                    autoComplete="off"
                    value={state.year}
                    onChange={inputChangeHandler}
                  ></input>
                </div>
              </div>
              <div className={classes.cvc}>
                <div>
                  <label>CVC</label>
                  {formValidityState.monthErrors ? <p>Can not be blank</p> : ""}
                </div>
                <input
                  name="cvc"
                  autoComplete="off"
                  maxLength={3}
                  // className={
                  //   formValidityState.cvcErrors ? classes["error-boder"] : ""
                  // }
                  type="cvc"
                  placeholder="e.g. 123"
                  value={state.cvc}
                  onChange={inputChangeHandler}
                ></input>
              </div>
            </div>
            <Button type="submit">confirm</Button>
          </form>
        </Container>
      ) : (
        <Container>
          <Card state={state}></Card>
          <div className={classes.resultCard}>
            <div className={classes.circle}>
              <img src={submitImg} alt="submitImg" />
            </div>
            <h1>THANK YOU!</h1>
            <span>We have added your card details</span>
            <Button>Continue</Button>
          </div>
        </Container>
      )}
    </div>
  );
};
export default MainContainer;
