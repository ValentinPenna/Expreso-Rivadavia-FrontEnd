import React from 'react'


interface ButtonProps{
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
 
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    onClick, disabled, type="button", className="", children,
}) => {
  return (
    <button
    disabled={disabled}
    type={type}
    onClick={onClick}
    className={`transition duration-300 bg-primary  text-white text-xl font-bold border rounded-full w-[300px] p-2 hover:bg-white hover:border-primary hover:border-2 hover:text-primary  ${className}`}
    >{children}</button>
  )
}

export default Button

