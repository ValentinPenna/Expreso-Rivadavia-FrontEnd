import { useUserStore } from "../store/userStore";
import type { User } from "../types/user";
import { useState } from "react";

export default function UserInfoDashboard() {
  const user: User | null = useUserStore((state) => state.user);
  const removeSession = useUserStore((state) => state.removeSession);
  const [editionMode, setEditionMode] = useState(false);

  const handleSessionClose = () => {
    removeSession();
    window.location.href = "/";
  };

  return (
    <div className="w-full my-4 bg-white px-24 pb-24 pt-20 rounded-l-lg flex flex-col ">
      <div className="flex flex-row justify-end mb-4">
        {editionMode ? (
          <button
            onClick={() => setEditionMode(!editionMode)}
            className="bg-primary text-white text-lg font-bold px-6 py-2 rounded-md hover:bg-white hover:text-primary border-2 border-primary"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setEditionMode(!editionMode)}
            className="bg-primary text-white text-lg font-bold px-6 py-2 rounded-md hover:bg-white hover:text-primary border-2 border-primary"
          >
            Editar
          </button>
        )}
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-row">
          <div className="w-1/2 h-fit  mb-6">
            <h2 className="font-bold text-2xl text-primary">Nombre:</h2>
            <h3 className="font-normal text-xl">{user?.name}</h3>
          </div>
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">Apellido:</h2>
            <h3 className="font-normal text-xl">{user?.lastName}</h3>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">Email:</h2>
            <h3 className="font-normal text-xl">{user?.email}</h3>
          </div>
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">
              Numero de Documento:
            </h2>
            <h3 className="font-normal text-xl">{user?.dni}</h3>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">Dirección:</h2>
            <h3 className="font-normal text-xl">{user?.address}</h3>
          </div>
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">Localidad:</h2>
            <h3 className="font-normal text-xl">{user?.locality}</h3>
          </div>
        </div>
        
      </div>
      <div className="flex flex-row justify-end mb-4">
        {editionMode ? (
          <></>
        ) : (
          <button
            onClick={handleSessionClose}
            className="bg-primary text-white text-lg font-bold px-6 py-2 rounded-md hover:bg-white hover:text-primary border-2 border-primary"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </div>
  );
}
