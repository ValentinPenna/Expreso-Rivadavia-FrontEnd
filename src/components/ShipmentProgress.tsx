import React, { useState } from 'react';
import { useOrdersStore } from '../store/ordersStore';
import type { Orders } from '../types/shipments';

const ShipmentProgress: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [order, setOrder] = useState<Orders | null>(null);
  const [error, setError] = useState<string | null>(null);
  const getOrders = useOrdersStore(state => state.getOrders);
  
  const handleSearch = async () => {
    try {
      const orders = await getOrders();
      const foundOrder = orders.find(order => order.id === searchTerm);
      if (foundOrder) {
        setOrder(foundOrder);
        setError(null);
      } else {
        setError('La orden no fue encontrada');
        setOrder(null);
      }
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        setError('No autorizado. Por favor, inicia sesión nuevamente.');
      } else {
        setError('Error al buscar la orden');
      }
      setOrder(null);
    }
  };

  return (
    <section className="w-full my-4 bg-white px-12 py-16 rounded-l-lg flex flex-col max-w-[80%] gap-2">
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-primary'>Progreso del envío</h1>
      </div>
      <h2 className='text-xl text-black'>Ver estado de envío:</h2>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Ingrese el ID de la orden"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-primary text-white rounded px-4 py-2"
        >
          Buscar
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {order && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Detalles de la Orden</h3>
          <p>ID del pedido: {order.id}</p>
          <p>Usuario: {order.user.name}</p>
          <p>Paquetes: {order.packages.length}</p>
          <p>Precio final: {order.final_price}</p>
          <p>Fecha: {new Date(order.date).toLocaleString()}</p>
          <p>Estado: {order.status}</p>
          <h4 className="text-md font-bold">Detalles del envío</h4>
          <p>Origen: {order.shipments.locality_origin.name}, {order.shipments.address_origin}</p>
          <p>Destino: {order.shipments.locality_destination.name}, {order.shipments.address_destination}</p>
          <p>Precio de envío: {order.shipments.shipment_price}</p>
        </div>
      )}
    </section>
  );
};

export default ShipmentProgress;
