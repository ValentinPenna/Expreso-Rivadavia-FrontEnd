import React, { useEffect, useState } from "react";
import { useOrdersStore } from "../store/ordersStore";
import type { Orders } from "../types/shipments";
import Button from "./secondary/Button";
import Modal from "./secondary/Modal";
import { toast } from "react-toastify";
import { authTransport } from "../helpers/auth";

const CarrierDashboard = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Orders[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterLocality, setFilterLocality] = useState<string>("");
  const getOrders = useOrdersStore((state) => state.getOrders);
  const changeStatusOrders = useOrdersStore(
    (state) => state.changeStatusOrders
  );

  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch(console.log);
  }, [getOrders]);

  //* aunto re render cuando se cambia el estado de la orden

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // acciona el endpoint de back
    changeStatusOrders(newStatus, orderId).then((res) => {
      if (res) {
        toast.success(`Se cambió el estado de la orden a ${res.status} `);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: res.status } : order
          )
        );
        setFilteredOrders((prevFilteredOrders) =>
          prevFilteredOrders.map((order) =>
            order.id === orderId ? { ...order, status: res.status } : order
          )
        );
        setDropdownVisible(null);
      }
    });
  };

  const handleFilter = () => {
    const filtered = orders.filter((order) => {
      const dateMatch = filterDate ? order.date.includes(filterDate) : true;
      const localityMatch = filterLocality
        ? order.shipments.locality_origin.name.includes(filterLocality) ||
          order.shipments.locality_destination.name.includes(filterLocality)
        : true;
      return dateMatch && localityMatch;
    });
    setFilteredOrders(filtered);
  };

  return (
    <div className="w-full my-4 bg-white p-12 rounded-l-lg flex flex-col ">
      <h1 className="text-xl lg:text-3xl text-primary font-bold mb-4 text-center">
        Lista de ordenes
      </h1>

      <div className="flex flex-row justify-end gap-4 mb-4">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="bg-light-gray  p-2 rounded-lg px-2 outline-none h-fit"
        />
        <select
          className="bg-light-gray text-black p-2 rounded-lg outline-none h-fit"
          onChange={(e) => {
            setFilterLocality(e.target.value);
          }}
        >
          <option value="">Todos</option>
          <option value="Rivadavia">Rivadavia</option>
          <option value="Fray Luis Beltrán">Fray Luis Beltrán</option>
          <option value="Rodeo del Medio">Rodeo del Medio</option>
          <option value="Rodeo de la Cruz">Rodeo de la Cruz</option>
          <option value="Maipú">Maipú</option>
          <option value="Ciudad de Mendoza">Ciudad de Mendoza</option>
          <option value="Guaymallén">Guaymallén</option>
          <option value="Godoy Cruz">Godoy Cruz</option>
          <option value="Las Heras">Las Heras</option>
          <option value="Luján de Cuyo">Luján de Cuyo</option>
          <option value="Chapanay">Chapanay</option>
          <option value="Tres Porteñas">Tres Porteñas</option>
          <option value="Junín">Junín</option>
          <option value="Medrano">Medrano</option>
          <option value="San Martín">San Martín</option>
          <option value="Los Barriales">Los Barriales</option>
          <option value="Palmira">Palmira</option>
          <option value="Rodriguez Peña">Rodriguez Peña</option>
          <option value="Ingeniero Giagnoni">Ingeniero Giagnoni</option>
          <option value="Corralitos">Corralitos</option>
          <option value="Lavalle">Lavalle</option>
        </select>

        <Button onClick={handleFilter} className="w-fit p-0.5 h-fit text-xs">
          Filtrar
        </Button>
      </div>

      <div className="grid grid-cols-6 ">
        <h3 className="flex justify-center items-center font-bold text-xs p-1 text-primary lg:text-base text-center border-b-2 border-x">
          Número de Orden
        </h3>
        <h3 className="flex justify-center items-center font-bold text-xs p-1 text-primary lg:text-base text-center border-b-2 border-x">
          Fecha de la orden
        </h3>
        <h3 className="flex justify-center items-center font-bold text-xs p-1 text-primary lg:text-base text-center border-b-2 border-x">
          Usuario
        </h3>
        <h3 className="flex justify-center items-center font-bold text-xs p-1 text-primary lg:text-base text-center border-b-2 border-x">
          Origen
        </h3>
        <h3 className="flex justify-center items-center font-bold text-xs p-1 text-primary lg:text-base text-center border-b-2 border-x">
          Destino
        </h3>
        <h3 className="flex justify-center items-center font-bold text-xs p-1 text-primary lg:text-base text-center border-b-2 border-x">
          Estado...
        </h3>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <React.Fragment key={order.id}>
              <p className=" text-xs overflow-hidden text-ellipsis p-1 whitespace-nowrap lg:text-base border-b border-x">
                {order.id}
              </p>
              <p className="flex items-center justify-center text-xs overflow-hidden text-center text-ellipsis p-1 whitespace-nowrap lg:text-base border-b border-x">
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="flex items-center justify-center text-xs p-1 text-center text-ellipsis overflow-hidden lg:text-base border-b border-x">
                {order.user.lastName}, {order.user.name}
              </p>
              <p className="flex items-center justify-center text-xs p-1 text-center text-ellipsis overflow-hidden lg:text-base border-b border-x ">
                {order.shipments.address_origin},{" "}
                {order.shipments.locality_origin.name}
              </p>
              <p className="flex items-center justify-center text-xs p-1 text-center text-ellipsis overflow-hidden lg:text-base border-b border-x">
                {order.shipments.address_destination},{" "}
                {order.shipments.locality_destination.name}
              </p>

              <div className="flex items-center justify-center relative text-xs p-1 text-center text-ellipsis overflow-hidden lg:text-base border-b border-x">
                <button
                  className="  w-fit text-primary font-bold p-4 text-xs lg:text-base"
                  onClick={() =>
                    setDropdownVisible(
                      dropdownVisible === order.id ? null : order.id
                    )
                  }
                >
                  {order.status}...
                </button>
                {dropdownVisible === order.id && (
                  <Modal onClose={() => setDropdownVisible(null)} open={true}>
                    <div className="flex flex-col p-4 ">
                      <h1 className="text-2xl text-primary mb-4 font-semibold">
                        Cambiar estado del envio
                      </h1>
                      <button
                        className="block px-4 py-2 font-bold border-primary border rounded-full text-primary hover:bg-zinc-50"
                        onClick={() =>
                          handleStatusChange(order.id, "En camino")
                        }
                      >
                        Empaque Recibido
                      </button>
                      <button
                        className="block px-4 py-2 font-bold border-primary border rounded-full text-primary mt-4 hover:bg-zinc-50"
                        onClick={() =>
                          handleStatusChange(order.id, "Entregado")
                        }
                      >
                        Empaque Entregado
                      </button>
                    </div>
                  </Modal>
                )}
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className="col-span-7 text-center">No hay órdenes</div>
        )}
      </div>
    </div>
  );
};

export default CarrierDashboard;
