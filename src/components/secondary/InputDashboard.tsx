import React from 'react'

interface InputDashboardProps {
    name: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputDashboard: React.FC <InputDashboardProps> = ({
    name,

    value,
    onChange,
}) => {
  return (
    <div>
      <input type="text"  
      name={name}
      value={value}
      onChange={onChange}
      className=" bg-transparent border-b border-primary focus:ring-0 focus:outline-none text-xl pt-2 px-1 " />
    </div>
  )
}

export default InputDashboard
