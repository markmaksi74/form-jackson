import React, { useContext } from "react";
import { InputContext } from "../FormInput/FormInput.component";
import "./Greeting.styles.scss";

export const Greeting: React.FC = () => {
  const {
    inputValue,
    isSubmitted,
  }: { inputValue: boolean; isSubmitted: boolean } = useContext(InputContext);
  return (
    <div
      className={`greeting ${isSubmitted ? "" : "greeting--hidden"}`}
    >{`Hello ${inputValue}`}</div>
  );
};

export default Greeting;
