import React, { ButtonHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}> {children}</button>;
};

export default Button;
