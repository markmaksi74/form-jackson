import React, { useContext } from "react";
// import { InputContext } from "../FormInput/FormInput.component";
import "./Greeting.styles.scss";

interface FormInputProps {
  inputValue: string;
  isSubmitted: boolean
}

export const Greeting: React.FC <FormInputProps> = (props): JSX.Element => {
  return (
    <div
      className={`greeting ${props.isSubmitted ? "" : "greeting--hidden"}`}
    >{`Hello ${props.inputValue}`}</div>
  );
};

export default Greeting;
