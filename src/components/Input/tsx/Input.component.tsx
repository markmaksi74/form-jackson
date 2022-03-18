import React, { useState, useRef } from 'react';
import './Input.styles.scss';

const defaultState = () => {
  return { inputValue: '' };
};

const Input: React.FC = () => {
  const textInputRef = useRef();

  const [formValues, setFormValues] = useState(() => defaultState()); // default state
  const [formErrors, setFormErrors] = useState({}); // invalid state
  const [isSubmit, setIsSubmit] = useState(false); // submitted state
  const [isValid, setValid] = useState(false); // valid state

  // changes the formValues as the user fills the input fields
  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target;
    // we spread the defaultState to preserve all the defaultState values
    setFormValues(
      (prevValues) => (prevValues = { ...formValues, [name]: value })
    );
    setFormErrors((prevErrs) => (prevErrs = validate(formValues)));
    console.log('formValues are: ', formValues);
    console.log('formErrors are: ', formErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents refresh
    // updated defaultState is validated
    // return of validate() is the new state of formErrors
    setFormErrors(validate(formValues));
    formErrors ? setValid(true) : setValid(false);
  };

  const validate = (updatedFormValues) => {
    const errors = {};
    if (!updatedFormValues.inputValue) {
      errors.inputValue = 'First Name is required!';
    } else if (updatedFormValues.inputValue.length > 5) {
      errors.inputValue = 'Input field cannot exceed 150 characters';
    }
    setValid(true);
    return errors; // changes the empty formErrors to "errors" object
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Welcome!</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 1)}</pre>
      )}

      <form
        className={`${isSubmit ? 'hidden' : ''}`}
        onSubmit={handleSubmit}
        autocomplete="off"
      >
        <div className="form">
          <div className="formInput">
            <label>First Name</label>
            <input
              ref={textInputRef}
              className={`${isValid ? 'valid' : 'invalid'} `}
              required
              type="text"
              name="inputValue"
              placeholder=""
              value={formValues.inputValue}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="error-message">{formErrors.inputValue}</p>

          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Input;
