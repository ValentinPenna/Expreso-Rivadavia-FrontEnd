import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface Review {
  username: string;
  rate: number;
  comment: string;
}

interface ReviewCarouselProps {
  reviews: Review[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prev = (): void => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? reviews.length - 1 : currentIndex - 1
    );
  };
  const next = (): void => {
    setCurrentIndex((currentIndex) =>
      currentIndex === reviews.length - 1 ? 0 : currentIndex + 1
    );
  };
  let count = reviews.length;
  return (
    <div className="relative overflow-hidden max-w-[600px] w-full">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(currentIndex * 100) / 1}%)`,
          width: `${(reviews.length * 100) / count}%`,
        }}
      >
        {reviews.map((review, index) => (
          <div key={index} className="w-full  flex-shrink-0 p-2">
            <div className="bg-white p-4 gap-1 flex flex-col items-center shadow-md rounded-lg">
              <h3 className="text-lg font-bold">{review.username}</h3>
              <p className="text-sm">
                Calificación{" "}
                <span className="text-primary font-bold">{review.rate}/5</span>
              </p>
              <p className="text-base text-center font-quicksand">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="rounded-full bg-secundary p-2 text-soft-letter shadow-card-shadow"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={next}
          className="rounded-full bg-secundary p-2 text-soft-letter shadow-card-shadow"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
