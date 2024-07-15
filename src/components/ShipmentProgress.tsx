import React, { useState } from 'react';
import { useOrdersStore } from '../store/ordersStore';
import type { Orders } from '../types/shipments';
import { FaTruck } from 'react-icons/fa6';

const ShipmentProgress: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [order, setOrder] = useState<Orders | null>(null);
  const [error, setError] = useState<string | null>(null);
  const getOrderId = useOrdersStore(state => state.getOrderId);
  
  const handleSearch = async () => {
    try {
      const order = await getOrderId(searchTerm);
      if (order) {
        setOrder(order);
        setError(null);
      } else {
        setError('La orden no fue encontrada');
        setOrder(null);
      }
    } catch (error: any) {
      if (error.message.includes('Unauthorized')) {
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
      <div className="flex items-center gap-4  flex-wrap">
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
      {order ? (
         <div className="mt-10 p-10 border-2 border-primary rounded-lg mx-auto">
          <p className="lg:text-2xl text-xl mb-2 "><span className="bullet">&#8226;</span> Estado de la orden: <span className="text-primary">{order.status} ✔</span></p>
          <p className="lg:text-lg text-md mb-2 "> - Fecha y hora: <span>{new Date(order.date).toLocaleString()} - </span></p>
          <p className="lg:text-2xl text-xl mb-2"><span className="bullet">&#8226;</span> Cantidad de paquetes: <span className="text-primary">{order.packages.length}</span></p>
        </div>
      ):(
        <div className="flex justify-center items-center mt-40">
          <h1 className='lg:text-2xl md:text-xl text-lg  flex items-center'>Aquí podrás ver el estado de tu envío...
          <FaTruck className='ml-4 w-10'/>
          </h1>
        </div>
      )}
    </section>
  );
};

export default ShipmentProgress;
