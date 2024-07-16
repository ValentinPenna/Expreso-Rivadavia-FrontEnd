import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import Button from "./Button";
import { useUserStore } from "../../store/userStore";
import type { ReviewUser } from "../../types/user";
import { toast } from "react-toastify";

const CardReviewPost: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [color, setColor] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const postReview = useUserStore((state) => state.postReview);
  const user = useUserStore((state) => state.user);

  const handleSubmit = async ({ rating, comment }: ReviewUser) => {
    try {
      const data = await postReview({ rating, comment }, user.id);
      toast.success("¡Gracias por tu comentario!");
      setComment("");
      setRating(null);
    } catch (error) {
      console.log(error);
    }
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
        onClick={() => handleSubmit({ rating: rating, comment: comment })}
        className="w-fit p-0.5 max-h-40  text-xs"
      >
        Enviar
      </Button>
      <p className="text-xs">
        Para dejar un comentario{" "}
        <a href="/auth/login" className="text-primary font-bold">
          {" "}
          Inicia sesión
        </a>
      </p>
    </div>
  );
};

export default CardReviewPost;
