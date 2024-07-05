import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaTruckFast, FaUserPen } from "react-icons/fa6";
import { GrSecure } from "react-icons/gr";
import { ImHistory } from "react-icons/im";
import ProfilePhoto from "./ProfilePhoto";

export default function SideMenu() {
  const [isFocused, setIsFocused] = useState<boolean>(true);

  return (
    <aside className="relative w-[20%] pr-4 pb-8">
      <nav
        className={`${
          isFocused ? " w-40 lg:w-full pr-4 " : "w-12 pr:4"
        } duration-300 relative transition-all overflow-hidden flex flex-col gap-10 items-center bg-white my-4 rounded-r-lg py-4 min-h-[79dvh] h-full`}
      >
        <button
          className="absolute right-4 lg:hidden "
          onClick={() => setIsFocused(!isFocused)}
        >
          <CiMenuBurger className="text-xl" color="#CB1B1A" />
        </button>
        <ProfilePhoto/>
        <div className="flex flex-col gap-6 text-xl items-start w-full">
          <div className="flex flex-row h-full">
            {window.location.pathname === "/dashboard" ? (
              <div className="flex items-center border-l-4 h-8 border-primary">
                <a className="ml-2 " href="/dashboard">
                  <FaUserPen className="text-2xl" color="#CB1B1A" />
                </a>
                <a
                  href="/dashboard"
                  className={`${
                    isFocused ? "block" : "hidden"
                  } font-bold text-lg pl-3`}
                >
                  Información del Usuario
                </a>
              </div>
            ) : (
              <div className="flex  items-center">
                <a className="ml-2 " href="/dashboard">
                  <FaUserPen className="text-2xl" color="#CB1B1A" />
                </a>

                <a
                  href="/dashboard"
                  className={`${
                    isFocused ? "block" : "hidden"
                  } font-normal text-lg pl-1`}
                >
                  Información del Usuario
                </a>
              </div>
            )}
          </div>
          <div className="flex flex-row h-fit">
            {window.location.pathname === "/dashboard/shipments" ? (
              <div className="flex items-center border-l-4 h-8 border-primary">
                <a className="ml-2 " href="/dashboard/shipments">
                  <ImHistory className="text-2xl" color="#CB1B1A" />
                </a>
                <a
                  href="/dashboard/shipments"
                  className={`${
                    isFocused ? "block" : "hidden"
                  } font-bold text-lg pl-3`}
                >
                  Historial de envios
                </a>
              </div>
            ) : (
              <div className="flex  items-center">
                <a className="ml-2 " href="/dashboard/shipments">
                  <ImHistory className="text-2xl" color="#CB1B1A" />
                </a>
                <a
                  href="/dashboard/shipments"
                  className={`${
                    isFocused ? "block" : "hidden"
                  } font-normal text-lg pl-1`}
                >
                  Historial de envios
                </a>
              </div>
            )}
          </div>
          <div className="flex flex-row h-fit">
            {window.location.pathname === "/dashboard/trackeo" ? (
              <div className="flex items-center border-l-4 h-8 border-primary">
                <a className="ml-2 " href="/dashboard/trackeo">
                  <FaTruckFast className="text-2xl" color="#CB1B1A" />
                </a>
                <a
                  href="/dashboard/trackeo"
                  className={`${
                    isFocused ? "block" : "hidden"
                  } font-bold text-lg pl-3`}
                >
                  Ver envios
                </a>
              </div>
            ) : (
              <div className="flex  items-center">
                <a className="ml-2 " href="/dashboard/trackeo">
                  <FaTruckFast className="text-2xl" color="#CB1B1A" />
                </a>
                <a
                  href="/dashboard/trackeo"
                  className={`${
                    isFocused ? "block" : "hidden"
                  } font-normal text-lg pl-1`}
                >
                  Ver envios
                </a>
              </div>
            )}
          </div>
          <div className="flex flex-row h-fit">
            {window.location.pathname === "/dashboard/security" ? (
              <div className="flex items-center border-l-4 h-8 border-primary">
                <a className="ml-2 " href="/dashboard/security">
                  <GrSecure className="text-2xl" color="#CB1B1A" />
                </a>
                <a
                  href="/dashboard/security"
                  className={`${
                    isFocused ? "block" : "hidden"
                  } font-bold text-lg pl-3`}
                >
                  Seguridad
                </a>
              </div>
            ) : (
              <div className="flex  items-center">
                <a className="ml-2 " href="/dashboard/security">
                  <GrSecure className="text-2xl" color="#CB1B1A" />
                </a>
                <a
                  href="/dashboard/security"
                  className={`${
                    isFocused ? "block" : "hidden"
                  } font-normal text-lg pl-1`}
                >
                  Seguridad
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}
