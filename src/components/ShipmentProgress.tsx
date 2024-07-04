import React, { useEffect, useState } from 'react'
import ShipmentStatus from './ShipmentStatus';

const ShipmentProgress = () => {
  const [currentStatus, setCurrentStatus] = useState('');

  return (
    <section className="w-full text-center my-4 bg-white px-12 py-16 rounded-l-lg flex flex-col max-w-[80%] gap-2">
      <h1 className='text-xl font-bold text-primary'>Progreso del envío</h1>
    <div className="flex justify-center mt-10">
    <ShipmentStatus currentStatus={currentStatus} />
   </div>
   </section>
  )
}

export default ShipmentProgress

