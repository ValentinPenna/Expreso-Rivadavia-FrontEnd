import React from "react";
import { ErrorMessage, Field } from "formik";

export interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  error?: string | null;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-primary lg:text-2xl md:text-2xl sm:text-xl mt-5"
      >
        {label}
      </label>
      <Field
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="bg-transparent border-b border-primary focus:ring-0 focus:outline-none lg:text-xl md:text-2xl text-xl py-2 px-1 w-full"
      />
      <ErrorMessage
        name={name}
        component={() => <div className="text-primary">{error}</div>}
      />
    </div>
  );
};
