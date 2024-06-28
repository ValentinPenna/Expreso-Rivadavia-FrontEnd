import { useUserStore } from "../store/userStore";

export default function UserShipments() {
    const user = useUserStore((state) => state.user)

    return (
        <div className="w-full my-4 bg-white px-24 pb-24 pt-20 rounded-l-lg flex flex-col max-w-[80%] gap-2">
            <h1 className="font-bold text-4xl text-primary">Historial de Envios</h1>
            <div className="flex flex-row font-bold p-4 rounded-lg justify-between items-center">
                <h3>Fecha</h3>
                <h3>Precio</h3>
                <h3>Estado de<br />la orden</h3>
            </div>
            <div className="flex flex-col gap-4">
                {user?.orders.map((order) => (
                    <div className="flex flex-row bg-primary text-white p-4 rounded-lg justify-between">
                        <h3>{new Date(order.date).toLocaleDateString()}</h3>
                        <h3>${order.final_price}</h3>
                        <h3>{order.status}</h3>
                    </div>
                ))
                }
            </div>
            
        </div>
    )
}