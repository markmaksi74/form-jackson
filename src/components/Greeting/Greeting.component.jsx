import React, { useContext } from 'react';
import { InputContext } from '../Input/Input.component';
import './Greeting.styles.scss';


function Greeting() {
  const {inputValue, isSubmit} = useContext(InputContext);
  return (
    <div
      className={`greetingInput ${isSubmit ? '' : 'greeting--hidden'}`}
    >{`Hello ${inputValue}`}</div>
  );
}

export default Greeting;