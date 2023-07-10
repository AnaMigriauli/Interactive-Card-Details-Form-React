import { useState, useReducer, useEffect } from "react";
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
  nameErrors: null,
  cardErrors: null,
  monthErrors: null,
  yearErrors: null,
  cvcErrors: null,
};
const letters = /[a-z]/gi;
const simbols = /[!@#$%^&*(),.?":{}|<>]/g;
const formValidityReducer = (state, action) => {
  // console.log(action);
  let isValid = false;
  switch (action.typeof) {
    case "NAME_ERROR":
      isValid = action.payload.trim().length !== 0 ? true : false;
      return {
        ...state,
        nameErrors: !isValid,
      };
    case "CARD_ERROR":
      isValid =
        simbols.test(action.payload) || letters.test(action.payload)
          ? false
          : true;
      return {
        ...state,
        cardErrors: !isValid,
      };
    case "MONTH_ERROR":
      isValid = +action.payload.trim().length !== 0 ? true : false;
      return {
        ...state,
        monthErrors: !isValid,
      };
    case "YEAR_ERROR":
      isValid = action.payload.trim().length !== 0 ? true : false;

      return {
        ...state,
        yearErrors: !isValid,
      };
    case "CVC_ERROR":
      isValid = action.payload.trim().length !== 0 ? true : false;

      return {
        ...state,
        cvcErrors: !isValid,
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

  const [isSubmit, setIsSubmit] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const nameValidityFunction = (e) => {
    dispatchFormValidity({ typeof: "NAME_ERROR", payload: e.target.value });
  };
  const curdValidityFunction = (e) => {
    dispatchFormValidity({ typeof: "CARD_ERROR", payload: e.target.value });
  };

  const monthValidityFunction = (e) => {
    dispatchFormValidity({ typeof: "MONTH_ERROR", payload: e.target.value });
  };
  const yearValidityFunction = (e) => {
    dispatchFormValidity({ typeof: "YEAR_ERROR", payload: e.target.value });
  };
  const cvcValidityFunction = (e) => {
    dispatchFormValidity({ typeof: "CVC_ERROR", payload: e.target.value });
  };

  const inputChangeHandler = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const { nameErrors: nameIsValid } = formValidityState;
  const { cardErrors: cardIsValid } = formValidityState;
  const { monthErrors: monthIsValid } = formValidityState;
  const { yearErrors: yearIsValid } = formValidityState;
  const { cvcErrors: cvcIsValid } = formValidityState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("cheak for validity");
      setFormIsValid(
        !nameIsValid &&
          !cardIsValid &&
          !monthIsValid &&
          !yearIsValid &&
          !cvcIsValid
      );
    }, 500);
    return () => {
      console.log("clean");
      clearTimeout(identifier);
    };
  }, [nameIsValid, cardIsValid, monthIsValid, yearIsValid, cvcIsValid]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !nameIsValid &&
      !cardIsValid &&
      !monthIsValid &&
      !yearIsValid &&
      !cvcIsValid
    ) {
      setIsSubmit(true);
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
          <Card state={state}></Card>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes["cardholder"]}>
              <label>Cardholder Name</label>
              <input
                className={
                  formValidityState.nameErrors ? classes["error-boder"] : ""
                }
                name="name"
                type="text"
                placeholder="e.g. Jane Appleseed"
                autoComplete="off"
                value={state.name}
                onChange={inputChangeHandler}
                onBlur={(e) => {
                  nameValidityFunction(e);
                }}
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
                onBlur={(e) => {
                  curdValidityFunction(e);
                }}
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
                    onBlur={(e) => {
                      monthValidityFunction(e);
                    }}
                  ></input>
                  <input
                    name="year"
                    className={
                      formValidityState.yearErrors ? classes["error-boder"] : ""
                    }
                    type="year"
                    maxLength={4}
                    placeholder="YY"
                    autoComplete="off"
                    value={state.year}
                    onChange={inputChangeHandler}
                    onBlur={(e) => {
                      yearValidityFunction(e);
                    }}
                  ></input>
                </div>
              </div>
              <div className={classes.cvc}>
                <div>
                  <label>CVC</label>
                  {formValidityState.monthErrors ||
                  formValidityState.yearErrors ||
                  formValidityState.cvcErrors ? (
                    <p>Can not be blank</p>
                  ) : (
                    ""
                  )}
                </div>
                <input
                  name="cvc"
                  autoComplete="off"
                  maxLength={3}
                  className={
                    formValidityState.cvcErrors ? classes["error-boder"] : ""
                  }
                  type="cvc"
                  placeholder="e.g. 123"
                  value={state.cvc}
                  onChange={inputChangeHandler}
                  onBlur={(e) => {
                    cvcValidityFunction(e);
                  }}
                ></input>
              </div>
            </div>
            <Button type="submit" disabled={!formIsValid}>
              confirm
            </Button>
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
