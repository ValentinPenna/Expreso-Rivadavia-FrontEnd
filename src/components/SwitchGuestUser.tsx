import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import Button from "./secondary/Button";
import { toast } from "react-toastify";

export default function SwitchGuestUser() {
  const token: string = useUserStore((state) => state.token);
  const removeSession = useUserStore((state) => state.removeSession);
  const uploadImage = useUserStore((state) => state.uploadImage);
  const { setUser, setToken } = useUserStore((state) => state);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  useEffect(() => {
    setUser();
    setToken();
  }, []);

  const handleSessionClose = () => {
    removeSession();
    toast.info("Has cerrado sesión");

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <>
      {!token ? (
        <div className="flex flex-row gap-6">
          <Button
            className="w-fit mx-10 px-4"
            onClick={() => (location.href = "/auth/register")}
          >
            INGRESAR
          </Button>
        </div>
      ) : (
        <>
          <button
            onBlur={() => setIsFocused(false)}
            className=" absolute right-12 top-4  z-50 flex flex-col gap-[3px] rounded-lg bg-secundary px-2 py-2 text-soft-letter "
            onClick={() => setIsFocused(!isFocused)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              preserveAspectRatio="none"
            >
              <path
                fill="#CB1B1A"
                d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 
                    4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 
                    1.413T18 20H6q-.825 0-1.412-.587T4 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15t-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6-8q.825 0 1.413-.587T14 
                    8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0 8"
              />
            </svg>
          </button>
          <ul
            onMouseDown={(e) => e.preventDefault()}
            className={`${isFocused ? "block gap-4 p-4 " : "hidden"} 
          bg-white flex flex-col shadow-lg text-black text-lg font-normal duration-400 right-4 top-20 rounded-lg absolute z-50  justify-center`}
          >
            <div className="flex flex-col justify-center items-center gap-4">
              <li>
                <a href="/dashboard" className="hover:text-primary">
                  Perfil
                </a>
              </li>
              <li>
                <Button className="text-xs w-fit" onClick={handleSessionClose}>
                  Cerrar sesión
                </Button>
              </li>
            </div>
          </ul>
        </>
      )}
    </>
  );
}
