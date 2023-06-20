import { useState } from "react";

const MainContainer = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    curdNumber: "",
    month: "",
    year: "",
    cvc: "",
  });
  const [FormErrors, setFormErrors] = useState({});
  console.log(formValues);
  const inputChangeHandler = (el, value) => {
    setFormValues({
      ...formValues,
      [el]: value,
    });
  };
  // const nameChangeHandler = (name) => {
  //   if (name.trim().length > 0) {
  //     setFormValues({ ..., name:formValues.name });
  //   } else if (name.match(/^[a-zA-Z]+$/)) {
  //     console.log("Wrong format, numbers letters");
  //   }
  // };
  // const curdNumberChangeHandler = (curdnumber) => {
  //   if (curdnumber.length > 16) {
  //     curdnumber = curdnumber.substr(0, 16);
  //   }
  //   const splits = curdnumber.match(/.{1,4}/g);
  //   let spacedNumber = "";
  //   if (splits) {
  //     spacedNumber = splits.join(" ");
  //   }
  //   console.log(spacedNumber);
  //   setCustomer({ ...customer, curdNumber: curdnumber });
  // };
  // const dataChangeHandler = (expdata) => {
  //   setCustomer({ ...customer, expData: expdata });
  // };
  // const YearChangeHandler = (year) => {
  //   setCustomer({ ...customer, year: year });
  // };
  // const inputChangeHandler = (cvc) => {
  //   setCustomer({ ...customer, cvc: cvc });
  // };
  const submitHandler = (e) => {
    e.preventDefault();
    const customerDataObj = {
      name: formValues.name,
      curdNumber: formValues.curdNumber,
      month: formValues.expData,
      year: formValues.year,
      cvc: formValues.cvc,
    };
    console.log(customerDataObj);
    setFormErrors(validate(customerDataObj));
  };
  const validate = (values) => {
    const errors = {};
    const re = /^[0-9\b]+$/;

    if (
      /[!@#$%^&*(),.?":{}|<>]/g.test(values.name) ||
      !/^[A-Z]/.test(values.name)
    ) {
      errors.name = "Wrong format, letters only";
    }
    if (!re.test(values.curdNumber)) {
      errors.curdNumber = "Wrong format, numbers only";
    }
    if (!values.month) {
      errors.month = "Can not be blank";
    }
    if (!values.year) {
      errors.year = "Can not be blank";
    }
    if (!values.cvc) {
      errors.cvc = "Can not be blank";
    }
    return errors;
  };
  console.log(FormErrors);
  return (
    <div onSubmit={submitHandler}>
      <div></div>
      <form>
        <label>Cardholder Name</label>
        <input
          type="text"
          placeholder="e.g. Jane Appleseed"
          value={formValues.name}
          onChange={(e) => {
            // const name = e.target.value;
            inputChangeHandler("name", e.target.value);
          }}
        ></input>

        <label>Card Number</label>
        <input
          placeholder="e.g. 1234 5678 9123 0000"
          value={formValues.curdNumber}
          onChange={(e) => {
            // const curdnumber = e.target.value;
            inputChangeHandler("curdNumber", e.target.value);
          }}
        ></input>

        <label>Exp. Date (MM/YY)</label>
        <input
          type="number"
          placeholder="MM"
          value={formValues.expData}
          onChange={(e) => {
            // const expdata = e.target.value;
            inputChangeHandler("month", e.target.value);
          }}
        ></input>
        <input
          type="number"
          placeholder="YY"
          value={formValues.year}
          onChange={(e) => {
            // const year = e.target.value;
            inputChangeHandler("year", e.target.value);
          }}
        ></input>

        <label>CVC</label>
        <input
          type="cvc"
          placeholder="e.g. 123"
          value={formValues.cvc}
          onChange={(e) => {
            // const cvc = e.target.value;
            inputChangeHandler("cvc", e.target.value);
          }}
        ></input>
        <button type="submit">confirm</button>
      </form>
    </div>
  );
};
export default MainContainer;
