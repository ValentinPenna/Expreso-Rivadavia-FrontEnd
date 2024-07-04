import React, { useEffect, useState } from 'react';

const shipmentState = [
  'Recibido',
  'En camino',
  'Llegando a destino',
  'Entregado  ✔',
];



const ShipmentStatus = () => {
  
  
  return (
      <div className="relative pl-6">  
      <div className="flex flex-col gap-10">
        {shipmentState.map((status) => (
          <div key={status} className="flex items-center ">
            <div className='w-5 h-5 rounded-full bg-primary'></div>
            <div className="ml-3 text-xl">{status}</div>
            

          </div>
        ))}
      </div>
    </div>
      
   
  )
}

export default ShipmentStatus