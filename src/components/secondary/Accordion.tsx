import { useState, type ReactNode } from "react";

interface AccordionProps {
  title: ReactNode | string;
  content: string;
  category?: string;
  subTitle?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  subTitle,
  title,
  content,
  category,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article className=" relative mb-2 w-[80%] ">
      <button
        className="hover:bg-zinc-50 cursor-pointer rounded-t p-4 border border-zinc-300 w-full text-left focus:outline-none"
        onClick={toggleAccordion}
      >
        <h2 className="font-quicksand text-black font-bold text-lg">{title}</h2>
        <img
          className={`absolute right-2 top-6 duration-200${
            isOpen ? "" : " rotate-180"
          }`}
          src="/svgs/arrowDown.svg"
          alt=""
        />
      </button>

      <div
        className={` accorde overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <h3>{subTitle}</h3>
        <p className="text-zinc-600 text-sm p-4 border border-t-0 border-zinc-300">
          {content}
        </p>
      </div>
    </article>
  );
};

export default Accordion;
