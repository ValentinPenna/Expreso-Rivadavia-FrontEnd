import { useEffect, useState } from "react";
import { useOrdersStore } from "../store/ordersStore";
import type { ILocality, Orders } from "../types/shipments";
import { useUserStore } from "../store/userStore";
import Button from "./secondary/Button";

export default function AdminDashboard() {
    const [showedOrders, setShowedOrders] = useState<Orders[]>([])
    const [orders, setOrders] = useState<Orders[]>([])
    const getOrders = useOrdersStore((state) => state.getOrders)
    const setUser = useUserStore((state) => state.setUser)
    const [searchDate, setSearchDate] = useState("")
    const [searchUser, setSearchUser] = useState("")
    const [origin, setOrigin] = useState("0")
    const [destination, setDestination] = useState("0")
    const [localities, setLocalities] = useState<ILocality[]>([])
    const getLocalities = useOrdersStore((state) => state.getLocalities)

    useEffect(() => {
        getLocalities().then((data) => setLocalities(data)).catch(console.log)
        getOrders().then((data) => setOrders(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))).catch(console.log)
    }, [])
    useEffect(() => {
        setUser()
        let filteredOrders = [...orders || []]
        if(searchDate && searchDate !== ""){
            filteredOrders = filteredOrders.filter(order => new Date(order.date).toISOString().split("T")[0] === new Date(searchDate).toISOString().split("T")[0])
            // setOrders(orders?.filter(order => new Date(order.date).toISOString().split("T")[0] === new Date(searchDate).toISOString().split("T")[0]))
        }
        if(searchUser && searchUser !== "") {
            filteredOrders = filteredOrders.filter(order => (order.user.name.toLowerCase() + order.user.lastName.toLowerCase()).includes(searchUser.toLowerCase()))
        }
        if(origin && origin !== "0") {
            filteredOrders = filteredOrders.filter(order => order.shipments.locality_origin.id === parseInt(origin))
        }
        if(destination && destination !== "0") {
            filteredOrders = filteredOrders.filter(order => order.shipments.locality_destination.id === parseInt(destination))
        }
        setShowedOrders(filteredOrders)
    }, [searchDate, orders, searchUser, origin, destination])

    return (
        <>
            <div className="flex flex-col justify-between lg:flex-row gap-3">
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex flex-col">
                            <input type="text" placeholder="Buscar por nombre" onChange={(e) => setSearchUser(e.target.value)} className="bg-primary text-white p-2 rounded-lg px-2 outline-none placeholder-light-gray w-36" value={searchUser}/>
                            {searchUser && <button className="text-sm" onClick={() => setSearchUser("")}>Borrar filtro</button>}
                        </div>
                        <div className="flex flex-col">
                            <input type="date" onChange={(e) => setSearchDate(e.target.value)} className="bg-primary text-white p-2 rounded-lg px-2 outline-none w-40" value={searchDate}/>
                            {searchDate && <button className="text-sm" onClick={() => setSearchDate("")}>Borrar filtro</button>}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex flex-col">
                            <select onChange={(e) => setOrigin(e.target.value)} className="bg-primary text-white p-2 rounded-lg px-2 outline-none placeholder-light-gray w-32" value={origin}>
                            <option value={0}>Origen</option>
                            {localities?.map((locality) => (
                                <option key={locality.id} value={locality.id}>{locality.name}</option>
                            ))}
                            </select>
                            {origin !== "0" && <button className="text-sm" onClick={() => setOrigin("0")}>Borrar filtro</button>}
                        </div>
                        <div className="flex flex-col">
                            <select onChange={(e) => setDestination(e.target.value)} className="bg-primary text-white p-2 rounded-lg px-2 outline-none placeholder-light-gray w-32" value={destination}>
                            <option value={0}>Destino</option>
                            {localities?.map((locality) => (
                                <option key={locality.id} value={locality.id}>{locality.name}</option>
                            ))}
                            </select>
                            {destination !== "0" && <button className="text-sm" onClick={() => setDestination("0")}>Borrar filtro</button>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                <button onClick={() => window.location.href = "/dashboard/admin/statistics"} className="bg-primary text-sm md:text-base text-white p-2 rounded-lg px-3 font-bold">Ver Estadisticas</button>
                <button onClick={() => window.location.href = "/dashboard/admin/users"} className="bg-primary text-sm md:text-base text-white p-2 rounded-lg px-3 font-bold">Ver Usuarios</button>
                </div>
            </div>
            <div className="flex flex-row justify-between px-1 lg:px-6">
                <h3 className="font-bold w-1/4 text-start">Fecha</h3>
                <h3 className="font-bold w-1/4 text-center">Usuario</h3>
                <h3 className="font-bold w-1/4 text-center">Origen / Destino</h3>
                <h3 className="font-bold w-1/4 text-end">Estado</h3>
            </div>
            {showedOrders.length > 0 ? (
                showedOrders?.map((order) => (
                    <div key={order.id} className="flex flex-row bg-white justify-between p-6 shadow-lg rounded-lg">
                    <h3 className="font-bold w-1/4 text-start">{new Date(order.date).toLocaleDateString()}</h3>
                    <h3 className="font-bold w-1/4 text-center">{order.user.lastName}, {order.user.name}</h3>
                    <h3 className="font-bold w-1/4 text-center">{order.shipments.locality_origin.name} / {order.shipments.locality_destination.name}</h3>
                    <h3 className="font-bold w-1/4 text-end">{order.status}</h3>
                    </div>
                ))
            ) : (
                <h3 className="text-center font-bold">No hay pedidos que concidan con la busqueda</h3>
            )
        }
        </>
    );
}