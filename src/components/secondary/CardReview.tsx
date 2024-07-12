import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import Button from "./Button";

const CardReview: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [color, setColor] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  interface CommentProps {
    rate: number | null;
    userComment: string;
  }

  const handleSubmit = ({ rate, userComment }: CommentProps) => {
    // se llama al endpoint del backend donde
    console.log(rate, userComment);
  };
  return (
    <div className="bg-white  flex gap-2 flex-col shadow-lg rounded-lg w-[500px] max-h-[320px] p-6">
      <h1 className="my-4 text-center font-quiksand font-bold text-lg lg:text-2xl text-primary">
        ¡Califica nuestro Servicio!
      </h1>

      <div className="flex ">
        {[...Array(5)].map((star, index) => {
          const currentRate = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rate"
                value={currentRate}
                onClick={() => setRating(currentRate)}
                className=" hidden"
              />
              <FaStar
                size={24}
                className=" cursor-pointer transition-all duration-75"
                color={currentRate <= (color || rating)! ? "#ffc107" : "gray"}
              />
            </label>
          );
        })}
      </div>
      <p className="font-light text-sm lg:text-lg">
        ¡Déjanos un cometario para mejorar!
      </p>
      <textarea
        className="bg-zinc-100  text-sm  p-2 rounded-lg lg:text-base"
        name="comment"
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <Button
        type="submit"
        onClick={() => handleSubmit({ rate: rating, userComment: comment })}
        className="w-fit p-0.5 max-h-40  text-xs"
      >
        Enviar
      </Button>
    </div>
  );
};

export default CardReview;
