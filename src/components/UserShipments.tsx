import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import type { Orders } from "../types/shipments";
import HistoryShipment from "./HistoryShipment";

export default function UserShipments() {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)
    const [orders, setOrders] = useState<Orders[] | undefined>([...user?.orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())])
    const [searchDate, setSearchDate] = useState("")
    // const [sorted, setSorted] = useState("")
    const [orderState, setOrderState] = useState("")

    useEffect(() => {
        setUser()
        setOrders(user?.orders?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
        setOrderState("all")
        // console.log(user)
        // setOrdersMock()
        // console.log(orderState)
        // localStorage.setItem("user", JSON.stringify(user))
    }, [])
    
    // useEffect(() => {
    //     setOrders(user?.orders?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    // }, [sorted, orderState, searchDate])
    
    // useEffect(() => {
    //     setSearchDate("")
    //     if(sorted === "latest"){
    //         sortedOrders = (user?.orders?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())) //nuevas -> viejas
    //         setOrders(sortedOrders)
    //     }else if (sorted === "oldest"){
        //         sortedOrders = (user?.orders?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())) //viejas -> nuevas
    //         setOrders(sortedOrders)
    //     }
    //     console.log(sorted)
    //     console.log(orders)
    // }, [sorted])
    
    useEffect(() => {
        setUser()
        // setOrdersMock()
        let filteredOrders = [...user?.orders || []]
        // console.log(user?.orders);
        if(searchDate && searchDate !== ""){
            filteredOrders = filteredOrders.filter(order => new Date(order.date).toISOString().split("T")[0] === new Date(searchDate).toISOString().split("T")[0])
            // setOrders(orders?.filter(order => new Date(order.date).toISOString().split("T")[0] === new Date(searchDate).toISOString().split("T")[0]))
        }
        if(orderState && orderState !== "all"){
            filteredOrders = filteredOrders.filter(order => order.status === orderState)
            // console.log(filteredOrders);
            // setOrders(orders?.filter(order => order.status === orderState))
        }
        setOrders(filteredOrders)
    }, [searchDate, orderState])


    return (
        <div className="w-full my-4 bg-white px-24 pb-24 pt-20 rounded-l-lg flex flex-col max-w-[80%] gap-2">
            <div className="">
                <h1 className="font-bold text-center text-2xl lg:text-4xl text-primary mb-10">Historial de Envios</h1>
                <div className="flex flex-wrap gap-4 justify-end">
                    <div className="flex flex-col items-start ">
                    <input type="date" onChange={(e) => setSearchDate(e.target.value)} className="bg-primary text-white p-2 rounded-lg px-2 outline-none h-fit " />
                    {searchDate && <button className="text-sm m-2" onClick={() => setSearchDate("")}>Borrar filtro</button>}
                    </div>
                    {/* <select className="bg-primary text-white p-2 rounded-lg outline-none h-fit" onChange={(e) => {
                        console.log(orders);
                        let sorteredOrders = [...orders || []]
                        if (e.target.value === "latest"){
                            sorteredOrders = (orders?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())!)
                        } else if (e.target.value === "oldest"){
                            sorteredOrders = (orders?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())!)
                        }
                        setOrders(sorteredOrders)
                        console.log(sorteredOrders);
                        console.log(e.target.value);
                        console.log(orders);
                        // setSorted(e.target.value);
                    }}>
                        <option value="latest">Más Recientes</option>
                        <option value="oldest">Más Antiguos</option>
                    </select> */}
                    <select className="bg-primary text-white p-2 rounded-lg outline-none h-fit" onChange={(e) => {setOrderState(e.target.value);}}>
                        <option value="all">Todos los estados</option>
                        <option value="Pendiente de pago">Pendiente de pago</option>
                        <option value="Esperando retiro">Esperando Retiro</option>
                        <option value="En camino">En Camino</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelled">Cancelado</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {orders?.length! > 0 ? (
                    // console.log(orders),
                    <HistoryShipment orders={orders!} />
                ) : (
                        <div className="flex flex-row text-black pt-12 w-full justify-center">
                            <h3 className=" text-2xl font-bold">No hay ordenes</h3>
                        </div>
                    )
                }
            </div>
            
        </div>
    )
}