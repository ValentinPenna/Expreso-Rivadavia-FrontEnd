import React from "react";
import { ErrorMessage, Field} from "formik";

export interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  error?: string | null;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-primary lg:text-4xl md:text-2xl sm:text-xl my-5"
      >
        {label}
      </label>
      <Field
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        className="bg-transparent border-b border-primary lg:text-3xl md:text-2xl sm:text-xl w-3/4"
      />
       <ErrorMessage
         name={name}
         component={() => (
           <div className="text-primary">{error}</div>
         )}
       />
    </div>
  );
};
