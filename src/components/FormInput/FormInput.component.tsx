/*
--The input field becomes hidden only when isSubmit state is true
--isSubmit becomes true only when isValid is true
*/

import React, { useState, createContext } from "react";
import "./Input.styles.scss";
import Greeting from "../Greeting/Greeting.component";
import "../../../images/circle-exclamation-solid.svg";

interface FormValues {
  inputValue: string;
}

interface FormEvent {
  preventDefault(): void;
  target: {
    name: string;
    value: string;
  };
}

interface FormValuesErrors {
  inputValue: string;
}

interface FormErrors {
  inputValue: string;
}

export const InputContext = createContext(null);
const formValues: FormValues = { inputValue: "" };

const defaultValuesState = (): FormValues => {
  return formValues;
};

const defaultErrorsState = (): FormErrors => {
  return formValues;
};

export const FormInput: React.FC = () => {
  const [formValues, setFormValues] = useState(() => defaultValuesState()); // default state
  const [formErrors, setFormErrors] = useState(() => defaultErrorsState()); // invalid state
  const [isSubmitted, setSubmit] = useState(false); // submitted state
  const [isValid, setValid] = useState(false); // valid state

  // changes the formValues as the user fills the input fields
  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target;
    // we spread the defaultState to preserve all the defaultState values
    setFormValues(
      (prevValues) => (prevValues = { ...formValues, [name]: value })
    );
    setFormErrors(validate(formValues));
  };

  const validate = (updatedFormValues: FormValues): FormValuesErrors => {
    const errors: FormValuesErrors = { inputValue: "" };
    if (!updatedFormValues.inputValue) {
      errors.inputValue = "Name is required!";
    } else if (updatedFormValues.inputValue.length > 5) {
      errors.inputValue = "Input field cannot exceed 150 characters";
    }
    setValid(true);
    return errors; // changes the empty formErrors to "errors" object
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevents refresh
    // updated defaultState is validated
    // return of validate() is the new state of formErrors
    setFormErrors(validate(formValues));
    setSubmit(!!isValid);
  };

  let context: { inputValue: string; isSubmitted: boolean } = {
    inputValue: formValues.inputValue,
    isSubmitted,
  };

  return (
    <>
      <form
        className={`formInput ${isSubmitted ? "formInput--hidden" : ""}`}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label className="formInput__label">Name</label>
        <input
          className={`${
            isValid ? "formInput--valid" : "formInput--invalid"
          } formInput__input `}
          required
          type="text"
          name="inputValue"
          value={formValues.inputValue}
          onChange={(e) => handleChange(e)}
        />
        <p className="formInput__error-message">{formErrors.inputValue}</p>
        <button className="button button--primary">Submit</button>
      </form>

      <InputContext.Provider value={context}>
        <Greeting />
      </InputContext.Provider>
    </>
  );
};

export default FormInput;
