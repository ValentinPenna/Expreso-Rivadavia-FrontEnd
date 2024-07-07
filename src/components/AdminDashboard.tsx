import { useEffect, useState } from "react";
import { useOrdersStore } from "../store/ordersStore";
import type { Orders } from "../types/shipments";

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Orders[]>([])
    const getOrders = useOrdersStore((state) => state.getOrders)
    useEffect(() => {
        getOrders().then(setOrders).catch(console.log)
    }, [])
    return (
        <>
            <div className="flex flex-row justify-between px-6">
                <h3 className="font-bold">Fecha</h3>
                <h3 className="font-bold">Usuario</h3>
                <h3 className="font-bold">Precio</h3>
                <h3 className="font-bold">Estado</h3>
            </div>
            {orders?.map((order) => (
                <div key={order.id} className="flex flex-row bg-white justify-between p-6 shadow-lg rounded-lg">
                    <h3 className="font-bold">{new Date(order.date).toLocaleDateString()}</h3>
                    <h3 className="font-bold">{order.user.lastName}, {order.user.name}</h3>
                    <h3 className="font-bold">{order.final_price}</h3>
                    <h3 className="font-bold">{order.status}</h3>
                </div>
            ))
            }
        </>
    );
}