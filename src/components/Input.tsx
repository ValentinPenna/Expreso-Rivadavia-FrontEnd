import React from "react";
import { Field } from "formik";

export interface InputProps {
  label: string;
  name: string;
  placeholder: string;
}
export const Input: React.FC<InputProps> = ({ label, name, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="origin" className="text-[#CB1B1A] text-4xl my-7">
        {label}
      </label>
      <Field
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        className="bg-transparent border-b border-[#CB1B1A] text-4xl w-3/4"
      />
    </div>
  );
};
