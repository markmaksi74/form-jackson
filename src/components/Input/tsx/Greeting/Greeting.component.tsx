import React, { useContext } from 'react';
import { InputContext } from '../Input/Input.component';
import './Greeting.styles.scss';

export const Greeting: React.FC = () => {
  const {inputValue , isSubmit} = useContext(InputContext);
  return (
    <div
      className={`greeting ${isSubmit ? '' : 'greeting--hidden'}`}
    >{`Hello ${inputValue}`}</div>
  );
}

export default Greeting;