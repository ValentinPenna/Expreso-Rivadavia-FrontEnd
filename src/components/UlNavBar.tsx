import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import SwitchGuestUser from "./SwitchGuestUser";

const UlNavBar = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <>
      <button
        onBlur={() => setIsFocused(false)}
        className=" right-4 top-8 absolute z-50 flex flex-col gap-[3px] rounded-lg bg-secundary px-2 py-2 text-soft-letter lg:hidden"
        onClick={() => setIsFocused(!isFocused)}
      >
        <CiMenuBurger className="text-xl" color="#CB1B1A" />
      </button>
      <ul
        onMouseDown={(e) => e.preventDefault()}
        className={`${isFocused ? "block gap-4 p-4 " : "hidden"} 
        bg-white flex rounded-sm flex-col-reverse shadow-lg text-black text-lg font-normal duration-400 right-0 -bottom-60 absolute z-50 lg:static lg:shadow-none lg:flex lg:w-full lg:flex-row lg:items-center  lg:gap-3 lg:bg-transparent justify-between`}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <li>
            <a href="/" className="hover:text-primary">
              Cotizar un envío
            </a>
          </li>
          <li>
            <a href="/new-shipment" className="hover:text-primary">
              Hacer un envío
            </a>
          </li>
          <li>
            <a href="/faqs" className="hover:text-primary">
              Preguntas Frecuentes
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-primary">
              Sobre Nosotros
            </a>
          </li>
        </div>
        <SwitchGuestUser />
      </ul>
    </>
  );
};

export default UlNavBar;
