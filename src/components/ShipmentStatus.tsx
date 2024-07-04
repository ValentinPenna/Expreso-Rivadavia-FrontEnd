import React, { useEffect, useState } from 'react';

const shipmentState = [
  'El paquete salio de origen',
  'El paquete se encuentra en tránsito',
  'El paquete se encuentra llegando a destino',
  'Paquete entregado',
];



const ShipmentStatus = ({ currentStatus }: { currentStatus: string }) => {
  const currentIndex = shipmentState.indexOf(currentStatus);
  
  return (
   
      <div className="relative pl-6">
      
      <div className="flex flex-col gap-10">
        {shipmentState.map((status, index) => (
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