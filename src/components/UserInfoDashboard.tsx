import { FaEdit } from "react-icons/fa";
import { useUserStore } from "../store/userStore";
import type { User, UserChangeData } from "../types/user";
import { useState } from "react";
import Button from "./secondary/Button";
import { toast } from "react-toastify";
import { Input } from "./secondary/Input";
import InputDashboard from "./secondary/InputDashboard";

export default function UserInfoDashboard() {
  const changeUserData = useUserStore((state) => state.changeUserData);
  const user: User | null = useUserStore((state) => state.user);
  const removeSession = useUserStore((state) => state.removeSession);
  const [editionMode, setEditionMode] = useState(false);
  const [userData, setUserData] = useState<User | null>(user);

  const handleSessionClose = () => {
    removeSession();
    toast.info("Has cerrado sesión");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };
  // console.log(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (userData) {
      setUserData({ ...userData, [name]: value });
    }
  };
  const handleChangeData = () => {
    if (userData) {
      const userinfo: UserChangeData = {
        email: userData.email,
        name: userData.name,
        lastName: userData.lastName,
        companyName: userData.companyName ?? "",
        dni: userData.dni ?? "",
        cuit_cuil: userData.cuit_cuil ?? "",
        address: userData.address,
        locality: userData.locality,
      };
      const idUser = userData.id;
      changeUserData(userinfo, idUser).then((res) => {
        toast.success("¡Se cambiaron los datos con exito!");
        setEditionMode(!editionMode);
      });
    }
  };
  return (
    <div className="w-full my-4 bg-white px-24 pb-24 pt-20 rounded-l-lg flex flex-col max-w-[80%]">
      <div className="flex flex-row justify-end mb-4">
        {editionMode ? (
          <button
            type="submit"
            onClick={() => handleChangeData()}
            className="bg-primary text-white text-lg font-bold px-6 py-2 rounded-md hover:bg-white hover:text-primary border-2 border-primary"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setEditionMode(!editionMode)}
            className=" flex items-center gap-2 bg-primary text-white text-lg font-bold px-6 py-2 rounded-md hover:bg-white hover:text-primary border-2 border-primary"
          >
            Editar
            <FaEdit color="black" />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-16">
        {user?.companyName && (
          <div className="flex flex-row">
            <div className="w-1/2 h-fit">
              <h2 className="font-bold text-2xl text-primary">
                Nombre de la empresa:
              </h2>
              {editionMode ? (
                <InputDashboard
                  type="text"
                  name="companyName"
                  value={userData?.companyName}
                  onChange={handleChange}
                />
              ) : (
                <h3 className="font-normal text-xl">{user?.companyName}</h3>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-row">
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">Nombre:</h2>
            {editionMode ? (
              <InputDashboard
                type="text"
                name="name"
                value={userData?.name}
                onChange={handleChange}
              />
            ) : (
              <h3 className="font-normal text-xl">{user?.name}</h3>
            )}
          </div>
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">Apellido:</h2>
            {editionMode ? (
              <InputDashboard
                type="text"
                name="lastName"
                value={userData?.lastName}
                onChange={handleChange}
              />
            ) : (
              <h3 className="font-normal text-xl">{user?.lastName}</h3>
            )}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">Email:</h2>
            {editionMode ? (
              <InputDashboard
                type="email"
                name="email"
                value={userData?.email}
                onChange={handleChange}
              />
            ) : (
              <h3 className="font-normal text-xl">{user?.email}</h3>
            )}
          </div>
          {!user?.cuit_cuil ? (
            <div className="w-1/2 h-fit">
              <h2 className="font-bold text-2xl text-primary">
                Numero de Documento:
              </h2>
              {editionMode ? (
                <InputDashboard
                  type="text"
                  name="dni"
                  value={userData?.dni}
                  onChange={handleChange}
                />
              ) : (
                <h3 className="font-normal text-xl">{user?.dni}</h3>
              )}
            </div>
          ) : (
            <div className="w-1/2 h-fit">
              <h2 className="font-bold text-2xl text-primary">CUIT / CUIL:</h2>
              {editionMode ? (
                <InputDashboard
                  type="text"
                  name="cuit_cuil"
                  value={userData?.cuit_cuil}
                  onChange={handleChange}
                />
              ) : (
                <h3 className="font-normal text-xl">{user?.cuit_cuil}</h3>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">Dirección:</h2>
            {editionMode ? (
              <InputDashboard
                type="text"
                name="address"
                value={userData?.address}
                onChange={handleChange}
              />
            ) : (
              <h3 className="font-normal text-xl">{user?.address}</h3>
            )}
          </div>
          <div className="w-1/2 h-fit">
            <h2 className="font-bold text-2xl text-primary">Localidad:</h2>
            {editionMode ? (
              <InputDashboard
                type="text"
                name="locality"
                value={userData?.locality}
                onChange={handleChange}
              />
            ) : (
              <h3 className="font-normal text-xl">{user?.locality}</h3>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end mb-4">
        {editionMode ? (
          <></>
        ) : (
          <Button onClick={handleSessionClose}>Cerrar sesión</Button>
        )}
      </div>
    </div>
  );
}
