import React, { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  errors?: any;
}

const FormInput: React.FC<InputProps> = ({
  label,
  type,
  name,
  register,
  errors,
  ...props
}) => {
  return (
    <div
      className={`flex ${
        type !== "checkbox" ? "flex-col-reverse" : "flex-row"
      } mb-3 w-4/6`}
    >
      <input type={type} id={name} {...register(name)} {...props} />
      {errors && errors[name] && (
        <span className="text-sm font-light text-red-500">
          {errors[name].message}
        </span>
      )}
      <label className="mb-1 text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default FormInput;
