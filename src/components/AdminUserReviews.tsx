import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";


const AdminUserReviews = () => {
  const getUsersRewies = useUserStore((state) => state.getUsersRewies);
  const [reviewsUser, setReviewsUser] = useState<any[]>([]);

  useEffect(() => {
    getUsersRewies().then((res) => {
      console.log(res);
      setReviewsUser(res!);
    });
  }, []);

 
  return (
    <main className="flex flex-col p-2 sm:p-6 gap-6 min-h-dvh">
      <div>
        <a
          href="/dashboard/admin/users"
          className="hover:text-primary text-lg  bg-white w-fit px-3 rounded-lg font-bold"
        >
          Volver
        </a>
      </div>
      <h1 className="text-4xl font-bold text-primary text-center">
        Comentarios de usuarios
      </h1>
      <div className="flex flex-wrap justify-center  gap-3">
        {reviewsUser.map((review) => (
          <div
            key={review.id}
            className="flex w-full md:w-2/3 lg:w-2/5 items-center bg-white shadow-lg justify-between p-4 sm:p-6 text-sm sm:text-lg rounded-lg"
          >
            {review.user.dni ? (
              <>
                <h3 className="w-1/4 text-start font-semibold ">
                  {review.user.lastName}, {review.user.name}
                </h3>
                <div className="flex w-3/4 flex-col">
                <h3 className="w-full text-center font-semibold ">
                  Valoración:{" "}
                  <span className="text-primary">{review.rating}</span>
                </h3>
                <h3 className="w-full text-center font-semibold ">
                  <span className="font-quicksand text-ellipsis">{review.comment}</span>
                </h3>
                </div>
              </>
            ) : (
              <>
                <h3 className="w-1/5 text-start font-semibold text-gray-700">
                  {review.user.companyName}
                </h3>
                <h3 className="w-1/5 text-center font-semibold text-gray-700">
                  Valoración:{" "}
                  <span className="text-primary">{review.rating}</span>
                </h3>
                <h3 className="w-1/5 text-center font-semibold text-gray-700">
                  Comentario:{" "}
                  <span className="font-quicksand text-ellipsis">{review.comment}</span>
                </h3>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminUserReviews;
