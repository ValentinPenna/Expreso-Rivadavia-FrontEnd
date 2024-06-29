
import { useState } from 'react'
import type { IHistoryShipmentProps, Orders} from '../types/shipments'


const HistoryShipment: React.FC<IHistoryShipmentProps> = ({orders}) => {
  const [expandedOrder, setExpandedOrder]=useState<string[]>([]);

  const handleToggleExpandedOrder = (orderId: string) => {
    if (expandedOrder.includes(orderId)) {
      setExpandedOrder(expandedOrder.filter(id => id!== orderId))
    } else {
      setExpandedOrder([...expandedOrder, orderId])
  }
  }
  return (
    <div className="w-full my-4 px-24 pb-24 pt-20 flex flex-col max-w-[80%] gap-2 ">
      <h1 className="text-primary text-4xl font-bold text-center">Ordenes</h1>
     {orders.map ((order: Orders)=> (
      <div key={order.id} className="bg-white shadow-lg p-6 rounded-lg relative">  
      <div
            className="flex items-center cursor-pointer "
            onClick={() => handleToggleExpandedOrder(order.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 mr-2 transition-transform transform ${
                expandedOrder.includes(order.id) ? 'rotate-90' : 'rotate-0'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="#CB1B1A"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <p className="text-xl font-bold mx-4">{`Orden: ${new Date(
              order.date
            ).toLocaleDateString()}`}
           </p>
           <div className='absolute right-6 top-6'>
           <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
  <g fill="none" stroke="#CB1B1A" strokeWidth="2">
    <rect width="14" height="17" x="5" y="4" rx="2"/>
    <path strokeLinecap="round" d="M9 9h6m-6 4h6m-6 4h4"/>
  </g>
</svg>
</div>
          </div>
          {expandedOrder.includes(order.id) && (
            <div className="ml-8 mt-2 text-xl ">
              <p>
                 Estado de la orden:
                <span className='text-primary'> {order.status}</span>
                </p>
              <p>Paquetes:
                <span className='text-primary'> {order.packages.join(', ')}</span>
                 </p>
              <p>Localidad de origen: 
                <span className='text-primary'> {order.shipments.locality_origin}</span>
                </p>
              <p>Localidad de destino:  
                <span className='text-primary'> {order.shipments.locality_destination}</span>
                </p>
              <p>Dirección de origen:  
               <span className='text-primary'> {order.shipments.address_origin}</span> 
                </p>
              <p>Dirección de destino: 
                <span className='text-primary'> {order.shipments.address_destination}</span> 
                 </p>
              <p>Precio del envío: 
                <span className='text-primary'> $ {order.shipments.shipment_price.toFixed(2)}</span>
                 </p>
                 <div className='border border-primary my-4 w-1/3'></div>
                 
                 <p>Precio de la orden: 
                <span className='text-primary font-bold '> $ {order.final_price.toFixed(2)}</span>  
                </p>
               
            </div>
          )}

     </div>
     ))}
      
    </div>
  )
}

export default HistoryShipment
