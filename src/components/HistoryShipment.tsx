import { statusMap } from '../types/shipments';
import { useState } from 'react'
import type { IHistoryShipmentProps, Orders} from '../types/shipments'
import { FaClipboard } from 'react-icons/fa6';
import { MdOutlineContentCopy } from 'react-icons/md';


const HistoryShipment: React.FC<IHistoryShipmentProps> = ({orders}) => {
  const [expandedOrder, setExpandedOrder]=useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleToggleExpandedOrder = (orderId: string) => {
    if (expandedOrder.includes(orderId)) {
      setExpandedOrder(expandedOrder.filter(id => id!== orderId))
    } else {
      setExpandedOrder([...expandedOrder, orderId])
  }
  }

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); 
    });
  };
  return (
    <div className="w-full my-4 pt-10 flex flex-col gap-2 ">
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
              {/* <p>Paquetes:
                <span className='text-primary'> {order.packages.join(', ')}</span>
                 </p> */}
              <p>Localidad de origen: 
                <span className='text-primary'> {order.shipments.locality_origin.name}</span>
                </p>
              <p>Localidad de destino:  
                <span className='text-primary'> {order.shipments.locality_destination.name}</span>
                </p>
              <p>Dirección de origen:  
               <span className='text-primary'> {order.shipments.address_origin}</span> 
                </p>
              <p>Dirección de destino: 
                <span className='text-primary'> {order.shipments.address_destination}</span> 
                 </p>
                 <div className='border border-primary my-4 w-1/3'></div>
                 <p className='flex flex-row'>
                Id del envío:<span className='text-primary ml-2'>{order.id}</span>
                <button
                  onClick={() => handleCopyId(order.id)}
                  className="ml-2 px-2 py-1 rounded flex items-center"
                >
                  <MdOutlineContentCopy className="mr-1" /> 
                </button>
                {copiedId === order.id && <span className="ml-2">¡Copiado!</span>}
              </p>
                 <p>Precio de la orden: 
                <span className='text-primary font-bold '> ${Number(order.final_price).toFixed(2)}</span>  
                </p>
               
            </div>
          )}

     </div>
     ))}
      
    </div>
  )
}

export default HistoryShipment
