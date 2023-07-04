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
// const VALIDATION_STATE = {
//   errors: false,
// };
// const errorReducer = (state, action) => {
//  if(action.type==='ERROR'){

//  }
//   }
// };
const MainContainer = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const [cardErrors, setCardErrors] = useState(false);
  const [errors, setErrors] = useState(false);
  const [yearErrors, setYearErrors] = useState(false);
  const [cvcErrors, setCvcErrors] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const inputChangeHandler = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  console.log(state);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      state.name.trim().length !== 0 &&
      state.curdNumber.trim().length !== 0 &&
      state.month.trim().length !== 0 &&
      state.year.trim().length !== 0 &&
      state.cvc.trim().length !== 0
    ) {
      setIsSubmit(true);
    }
  };

  const number = /^[1-9\b]+$/;
  const simbols = /[!@#$%^&*(),.?":{}|<>]/g;
  const validateCurdNumber = (value) => {
    if (simbols.test(value) || !number.test(value)) {
      setCardErrors(true);
    }
  };

  const validateInputs = (value) => {
    if (+value.length === 0 && +value.length === 0 && +value.length === 0) {
      setErrors(true);
    }
  };
  const validateYear = (value) => {
    if (+value.length === 0) {
      setYearErrors(true);
    }
  };
  const validateCvc = (value) => {
    if (+value.length === 0) {
      setCvcErrors(true);
    }
  };

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
          <Card></Card>
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
                {cardErrors && <p>Wrong format, numbers only</p>}
              </div>
              <input
                name="curdNumber"
                className={cardErrors ? classes["error-boder"] : ""}
                placeholder="e.g. 1234 5678 9123 0000"
                maxLength={19}
                autoComplete="off"
                value={CurdNumberFormat(state.curdNumber)}
                onChange={inputChangeHandler}
                onBlur={(e) => {
                  validateCurdNumber(e.target.value);
                }}
              ></input>
            </div>

            <div className={classes["exp-date"]}>
              <div className={classes.data}>
                <label>Exp. Date (MM/YY)</label>
                <div className={classes.input}>
                  <input
                    name="month"
                    className={errors ? classes["error-boder"] : ""}
                    // type="number"
                    placeholder="MM"
                    maxLength={2}
                    autoComplete="off"
                    value={state.expData}
                    onChange={inputChangeHandler}
                    onBlur={(e) => {
                      validateInputs(e.target.value);
                    }}
                  ></input>
                  <input
                    name="year"
                    className={yearErrors ? classes["error-boder"] : ""}
                    type="year"
                    maxLength={4}
                    placeholder="YY"
                    autoComplete="off"
                    value={state.year}
                    onChange={inputChangeHandler}
                    onBlur={(e) => {
                      validateYear(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className={classes.cvc}>
                <div>
                  <label>CVC</label>
                  {errors || yearErrors || cvcErrors ? (
                    <p>Can not be blank</p>
                  ) : (
                    ""
                  )}
                </div>
                <input
                  name="cvc"
                  autoComplete="off"
                  maxLength={3}
                  className={cvcErrors ? classes["error-boder"] : ""}
                  type="cvc"
                  placeholder="e.g. 123"
                  value={state.cvc}
                  onChange={inputChangeHandler}
                  onBlur={(e) => {
                    validateCvc(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <Button type="submit">confirm</Button>
          </form>
        </Container>
      ) : (
        <Container>
          <Card isSubmit={isSubmit} state={state}></Card>
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
