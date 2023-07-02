import { useState } from "react";
import Button from "./UI/Buttons";
import submitImg from "../assets/images/Path.svg";
import classes from "./MainContainer.module.css";
import circles from "../assets/images/Group 8.svg";

const MainContainer = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    curdNumber: "",
    month: "",
    year: "",
    cvc: "",
  });
  const [cardErrors, setCardErrors] = useState(false);
  const [errors, setErrors] = useState(false);
  // const [yearErrors, setYearErrors] = useState(false);
  // const [cvcErrors, setCvcErrors] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  // const [navigate, setNavigate] = useState(false);

  const inputChangeHandler = (el, value) => {
    setFormValues({
      ...formValues,
      [el]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      formValues.name.trim().length !== 0 &&
      formValues.curdNumber.trim().length !== 0 &&
      formValues.month.trim().length !== 0 &&
      formValues.year.trim().length !== 0 &&
      formValues.cvc.trim().length !== 0
    ) {
      setIsSubmit(true);
    }
  };

  const number = /^[a-z\b]+$/;
  const simbols = /[!@#$%^&*(),.?":{}|<>]/g;
  const validateCurdNumber = (value) => {
    if (simbols.test(value) || number.test(value)) {
      setCardErrors(true);
    }
  };

  const validateInputs = (value) => {
    console.log(typeof +value);
    if (+value.length === 0 && +value.length === 0 && +value.length === 0) {
      setErrors(true);
    }
  };
  // const validateYear = (value) => {
  //   if (+value.length === 0) {
  //     setYearErrors(true);
  //   }
  // };
  // const validateCvc = (value) => {
  //   if (+value.length === 0) {
  //     setCvcErrors(true);
  //   }
  // };

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
        <div className={classes["main-container"]}>
          <div className={classes.header}>
            <div className={classes.mask1}>
              <div className={classes["mask-rectangle"]}></div>
              <div className={classes["mask-cvc"]}>000</div>
            </div>
            <div className={classes.mask2}>
              <img src={circles} alt="circles" />
              <div className={classes["mask-card-number"]}>
                0000 0000 0000 0000
              </div>
              <div className={classes["mask-info"]}>
                <p className={classes["mask-cardholder"]}>JANE APPLESEED</p>
                <p className={classes["mask-data"]}>00/00</p>
              </div>
            </div>
          </div>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes["cardholder"]}>
              <label>Cardholder Name</label>
              <input
                type="text"
                placeholder="e.g. Jane Appleseed"
                value={formValues.name}
                onChange={(e) => {
                  inputChangeHandler("name", e.target.value);
                }}
              ></input>
            </div>
            <div className={classes["curd-number"]}>
              <div>
                <label>Card Number</label>
                {cardErrors && <p>Wrong format, numbers only</p>}
              </div>
              <input
                className={cardErrors ? classes["error-boder"] : ""}
                placeholder="e.g. 1234 5678 9123 0000"
                value={formValues.curdNumber}
                onChange={(e) => {
                  inputChangeHandler(
                    "curdNumber",
                    CurdNumberFormat(e.target.value)
                  );
                }}
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
                    className={errors ? classes["error-boder"] : ""}
                    type="number"
                    placeholder="MM"
                    value={formValues.expData}
                    onChange={(e) => {
                      inputChangeHandler("month", e.target.value);
                    }}
                    onBlur={(e) => {
                      validateInputs(e.target.value);
                    }}
                  ></input>
                  <input
                    className={errors ? classes["error-boder"] : ""}
                    type="year"
                    placeholder="YY"
                    value={formValues.year}
                    onChange={(e) => {
                      inputChangeHandler("year", e.target.value);
                    }}
                    onBlur={(e) => {
                      validateInputs(e.target.value);
                    }}
                  ></input>
                </div>
                {/* {monthErrors && <p>Can not be blank</p>}
                {yearErrors && <p>Can not be blank</p>} */}
              </div>
              <div className={classes.cvc}>
                <div>
                  <label>CVC</label>
                  {errors && <p>Can not be blank</p>}
                </div>
                <input
                  className={errors ? classes["error-boder"] : ""}
                  type="cvc"
                  placeholder="e.g. 123"
                  value={formValues.cvc}
                  onChange={(e) => {
                    inputChangeHandler("cvc", e.target.value);
                  }}
                  onBlur={(e) => {
                    validateInputs(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <Button type="submit">confirm</Button>
          </form>
        </div>
      ) : (
        <div>
          <div>
            <div
              style={{
                width: "286px",
                height: "157px",
                background:
                  "linear-gradient(168.73deg, #FFFFFF 5%, #D2D3D9 91.69%)",
              }}
            >
              <div
                style={{
                  width: "286px",
                  height: "34.6px",
                  background: "#2F2F2F",
                }}
              ></div>
              <div
                style={{
                  width: "230.98px",
                  height: "29.74px",
                  background: "#ADB5BE",
                }}
              >
                {formValues.cvc}
              </div>
            </div>
            <div
              style={{
                width: "285px",
                height: "156.21px",
                background:
                  "linear-gradient(163.95deg, #6348FE 4.74%, #610595 88.83%)",
              }}
            >
              <div>{CurdNumberFormat(formValues.curdNumber)}</div>
              <div>
                <p>{formValues.name}</p>
                <p>{`${formValues.month}/${formValues.year}`}</p>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                background:
                  "linear-gradient(163.95deg, #6348FE 4.74%, #610595 88.83%)",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={submitImg}
                alt="submitImg"
                style={{
                  width: "24.04px",
                  height: "16px",
                }}
              />
            </div>
            <h1>THANK YOU!</h1>
            <span>We have added your card details</span>
            <Button>Continue</Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MainContainer;
