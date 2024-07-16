import React, { useEffect, useState } from "react";
import ReviewCarousel from "./ReviewCarrousel";
import { getReviews } from "../helpers/getReviews";

const reviews = [
  { username: "Pedro Alvarez", rate: 5, comment: "Muy cumplidos" },
  { username: "Santiago Bernuli", rate: 4, comment: "Buena experiencia" },
  { username: "Matias", rate: 5, comment: "Fantastico" },
  { username: "Alex", rate: 5, comment: "Siempre atentos" },
  { username: "Cristian", rate: 4, comment: "Siempre dispuestos a mejorar" },
];
interface Rating {
  average: string;
  totalReviews: number;
}

const ReviewsUsers: React.FC = () => {
  const [reviewsAverage, setReviewsAverage] = useState<Rating>({
    average: "",
    totalReviews: 0,
  });
  useEffect(() => {
    getReviews()
      .then((res) => {
        setReviewsAverage(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="bg-white p-6  items-center mt-5 flex  flex-col lg:flex-row shadow-md">
      <div className="flex items-balance w-1/2 justify-center   mb-4">
        <div>
          <h2 className="text-lg  lg:text-2xl text-center font-semibold">
            Lo que opinan nuestros clientes!
          </h2>
          <p className="text-base text-center text-gray-600">
            Promedio de calificación
            <br />
            <span className="text-primary font-bold">
              {reviewsAverage.average}/5
            </span>
          </p>
          <p className="text-lg text-center font-bold ">
            {reviewsAverage.totalReviews} Reviews
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <h2 className="font-bold text-center text-xl">
          Opiniones de clientes satisfechos.
        </h2>
        <ReviewCarousel reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewsUsers;
