import React from "react";
// import { InputContext } from "../FormInput/FormInput.component";
import "./GreetingMessage.styles.scss";

interface FormInputProps {
  inputValue: string;
  isSubmitted: boolean | undefined
}

export const GreetingMessage: React.FC <FormInputProps> = (props): JSX.Element => {
  return (
    <div
      className={`greeting-message ${props.isSubmitted ? "" : "greeting-message--hidden"}`}
    >{`Hello ${props.inputValue}`}</div>
  );
};

export default GreetingMessage;