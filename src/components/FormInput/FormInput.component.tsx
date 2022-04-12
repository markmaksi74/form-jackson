/*
--The input field becomes hidden only when isSubmit state is true
--isSubmit becomes true only when isValid is true
*/

import React, { useState, createContext } from "react";
import "./FormInput.styles.scss";
import Greeting from "../Greeting/Greeting.component";
import exclamation from "../../../images/circle-exclamation-solid.png";

interface FormValues {
  inputValue: string;
}

// interface FormEvent {
//   preventDefault(): void;
//   target: {
//     name: string;
//     value: string;
//   };
// }

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
  const [isValid, setValid] = useState(true); // valid state

  // changes the formValues as the user fills the input fields
  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    const changed = { ...formValues, [name]: value }; // Spread the default state to preserve the values

    setFormValues(changed);

    setFormErrors(validate(changed));
  };

  const validate = (formValues: FormValues): FormValuesErrors => {
    const errors: FormValuesErrors = { inputValue: "" };
    console.log(`Validate here ${formValues.inputValue}`);

    if (formValues.inputValue.length > 150) {
      errors.inputValue = "Input field cannot exceed 150 characters";
      setValid(false);
    } else if (/[^a-zA-Z0-9]/.test(formValues.inputValue)) {
      errors.inputValue = "non-alphanumeric characters are not allowed.";
      setValid(false);
    } else {
      setValid(true);
    }
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
        <label
          className={`${
            formValues.inputValue.length === 0 ||
            formValues.inputValue.length < 150
              ? ""
              : "formInput--invalidLabel"
          } ${
            /[^a-zA-Z0-9]/.test(formValues.inputValue) ? "formInput--invalidLabel" : ""
          }  formInput__label `}
        >
          Name
        </label>
        <img  src={exclamation} className={`${isValid ? "element-hidden" : ""} errorImg`} alt="error"/>
        <input
          className={`${
            formValues.inputValue.length > 0 &&
            formValues.inputValue.length < 150
              ? "formInput--validInput"
              : ""
          }
          ${
            formValues.inputValue.length >= 150 ? "formInput--invalidInput" : ""
          }
          ${
            /[^a-zA-Z0-9]/.test(formValues.inputValue)
              ? "formInput--invalidInput"
              : ""
          } 
          ${formValues.inputValue.length === 0 ? "formInput--defaultInput" : ""}
          formInput__input`}
          required
          type="text"
          name="inputValue"
          value={formValues.inputValue}
          onChange={(e) => handleChange(e)}
        />
        <p className="formInput__error-message">{formErrors.inputValue}</p>
      </form>

      <InputContext.Provider value={context}>
        <Greeting />
      </InputContext.Provider>
    </>
  );
};

export default FormInput;
