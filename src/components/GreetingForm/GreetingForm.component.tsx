/*
--The input field becomes hidden only when isSubmit state is true
--isSubmit becomes true only when isValid is true
*/

import React, { useState } from "react";
import "./GreetingForm.styles.scss";
import GreetingMessage from "../GreetingMessage/GreetingMessage.component";
import exclamation from "../../../images/circle-exclamation-solid.png";

interface FormValues {
  inputValue: string;
}

interface FormValuesErrors {
  inputValue: string;
}

interface FormErrors {
  inputValue: string;
}

interface Greeting {
  inputValue: string;
  isSubmitted: boolean | undefined;
}

const formValues: FormValues = { inputValue: "" };

const formErrors: FormErrors = { inputValue: "Input cannot be empty." };

const defaultValuesState = (): FormValues => {
  return formValues;
};

const defaultErrorsState = (): FormErrors => {
  return formErrors;
};

export const GreetingForm: React.FC = () => {
  const [formValues, setFormValues] = useState(() => defaultValuesState());
  const [formErrors, setFormErrors] = useState(() => defaultErrorsState());
  const [isSubmitted, setSubmit] = useState<undefined | false | true>(undefined);
  const [isValid, setValid] = useState<undefined | false | true>(undefined);

  // changes the formValues as the user fills the input fields
  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    const changed = { ...formValues, [name]: value };
    setFormValues(changed);
    setFormErrors(validate(changed));
  };

  const validate = (formValues: FormValues): FormValuesErrors => {
    const errors: FormValuesErrors = { inputValue: "" };

    if (formValues.inputValue.length > 5) {
      errors.inputValue = "Input field cannot exceed 150 characters";
      setValid(false);
    } else if (/[^a-zA-Z0-9]/.test(formValues.inputValue)) {
      errors.inputValue = "non-alphanumeric characters are not allowed.";
      setValid(false);
    } else if (formValues.inputValue.length === 0) {
      // this occurs when the user input something and then erases it to empty input
      errors.inputValue = "Input cannot be empty.";
      setValid(undefined);
    } else {
      errors.inputValue = "";
      setValid(true);
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // formErrors.inputValue === '' ? setSubmit(undefined) : setSubmit(false);
    isValid ? setSubmit(true) : setSubmit(false);
  };

  const emptyInvalidSubmitState =
    formValues.inputValue === "" && isSubmitted === false;

  const initialInvalidInputState =
    formValues.inputValue === "" && isSubmitted === undefined;

  let greetingMessage: Greeting = {
    inputValue: formValues.inputValue,
    isSubmitted,
  };

  return (
    <>
      <form
        className={`form-input ${
          isSubmitted && isValid ? "form-input--hidden" : ""
        }`}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label
          className={`${
            isValid === false || emptyInvalidSubmitState
              ? "form-input--invalidLabel"
              : ""
          } form-input__label `}
        >
          Name
        </label>
        <img
          src={exclamation}
          className={`${
            initialInvalidInputState || isValid
              ? "icon-error--hidden"
              : "icon-error--show"
          } icon-error`}
          alt="error"
        />
        <input
          className={`${
            isValid === true || emptyInvalidSubmitState
              ? "form-input--validInput"
              : ""
          }
          ${
            isValid === false || emptyInvalidSubmitState
              ? "form-input--invalidInput"
              : ""
          } 
          ${
            formValues.inputValue.length === 0 ? "form-input--defaultInput" : ""
          }
          form-input__input`}
          type="text"
          name="inputValue"
          value={formValues.inputValue}
          onChange={(e) => handleChange(e)}
        />
        <p className="form-input__error-message">
          {initialInvalidInputState ? "" : formErrors.inputValue}
        </p>
      </form>

      <GreetingMessage
        inputValue={greetingMessage.inputValue}
        isSubmitted={greetingMessage.isSubmitted}
      />
    </>
  );
};

export default GreetingForm;
