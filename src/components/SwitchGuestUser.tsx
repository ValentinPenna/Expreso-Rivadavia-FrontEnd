import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import Button from "./secondary/Button";
import { toast } from "react-toastify";

export default function SwitchGuestUser() {
  const token: string = useUserStore((state) => state.token);
  const user = useUserStore((state)=>state.user)
  const removeSession = useUserStore((state) => state.removeSession);
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
      {!token || token === "undefined" ? (
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
            className="absolute right-14 top-6 lg:flex z-50 flex-col gap-[3px] "
            onClick={() => setIsFocused(!isFocused)}
          >
            <img src={user.profilePicture} alt="profile" className="rounded-full w-14 h-14"/>
            
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
