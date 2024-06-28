import React, { useState } from 'react'
import type { Orders } from '../types/shipments'
import HistoryShipment from './HistoryShipment'

const preloadOrders: Orders = {
    id: '1',
    user: {
        id: '1',
        name: 'John',
        lastName: 'Doe',
        companyName: 'Company XYZ',
        email: 'john.doe@example.com',
        dni: '12345678',
        cuit_cuil: '12345678901',
        address: '123 Main St',
        locality: 'Cityville',
        role: 'user',
        orders: []
    },
    shipments: {
      id: 'shipment1',
      orders: '1',
      locality_origin: 'Ciudad de Mendoza',
      locality_destination: 'Godoy Cruz',
      address_origin: 'Calle Falsa 123',
      address_destination: 'Avenida Siempre Viva 742',
      shipment_price: 200,
    },
    packages: ['Paquete 1', 'Paquete 2'],
    receipt: {
      id: 'receipt1',
      user: 'John Doe',
      orders: '1',
      link: 'https://example.com/receipt1',
    },
    date: '2023-01-01',
    final_price: 500,
    status: 'En camino',

    
  };

const OrdersShipment = () => {
    const [ordersShipment, setOrdersShipment]= useState<Orders[]>([preloadOrders])
  return (
    <div>
        {ordersShipment.length > 0 ? (
            <div>
                <HistoryShipment orders={ordersShipment}/>
            </div>
        ) : (
            <div>
                <h1>NO SE ENCONTRARON ORDENES DE ENVIO</h1>
            </div>
        )}
    </div>
  )
}

export default OrdersShipment
