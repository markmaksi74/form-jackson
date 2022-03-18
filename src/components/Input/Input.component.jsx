/*
--The input field becomes hidden only when isSubmit state is true
--isSubmit becomes true only when isValid is true
*/

import { useState, createContext } from 'react';
import './Input.styles.scss';
import Greeting from '../Greeting/Greeting.component';
import "../../../images/circle-exclamation-solid.svg"

export const InputContext = createContext();

const defaultState = () => {
  return { inputValue: '' };
};

export const Input = () => {
  const [formValues, setFormValues] = useState(() => defaultState()); // default state
  const [formErrors, setFormErrors] = useState({}); // invalid state
  const [isSubmit, setSubmit] = useState(false); // submitted state
  const [isValid, setValid] = useState(false); // valid state

  // changes the formValues as the user fills the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // we spread the defaultState to preserve all the defaultState values
    setFormValues(
      (prevValues) => (prevValues = { ...formValues, [name]: value })
    );
    setFormErrors((prevErrs) => (prevErrs = validate(formValues)));
  };

  const validate = (updatedFormValues) => {
    const errors = {};
    if (!updatedFormValues.inputValue) {
      errors.inputValue = 'Name is required!';
    } else if (updatedFormValues.inputValue.length > 5) {
      errors.inputValue = 'Input field cannot exceed 150 characters';
    }
    setValid(true);
    return errors; // changes the empty formErrors to "errors" object
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents refresh
    // updated defaultState is validated
    // return of validate() is the new state of formErrors
    setFormErrors(validate(formValues));
    isValid ? setSubmit(true) : setSubmit(false);
  };

  let context = { inputValue: formValues.inputValue , isSubmit };

  return (
    <>
      <form
        className={`formInput ${isSubmit ? 'formInput--hidden' : ''}`}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label className="formInput__label">First Name</label>
        <input
          className={`${
            isValid ? 'formInput--valid' : 'formInput--invalid'
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

export default Input;
