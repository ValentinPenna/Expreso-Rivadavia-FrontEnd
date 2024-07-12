import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

const Stars = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [color, setColor] = useState<number | null>(null);
  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const currentRate = index + 1;
        return (
          <>
            <label>
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
          </>
        );
      })}
    </div>
  );
};

export default Stars;
