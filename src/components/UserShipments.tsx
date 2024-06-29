import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import type { Orders } from "../types/shipments";

export default function UserShipments() {
    const user = useUserStore((state) => state.user)
    const [orders, setOrders] = useState<Orders[] | undefined>([...user?.orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())])
    const [searchDate, setSearchDate] = useState("")
    // const [sorted, setSorted] = useState("")
    const [orderState, setOrderState] = useState("")

    useEffect(() => {
        setOrders(user?.orders?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
        setOrderState("all")
        console.log(orderState)
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
        let filteredOrders = [...user?.orders || []]
        if(searchDate && searchDate !== ""){
            filteredOrders = filteredOrders.filter(order => new Date(order.date).toISOString().split("T")[0] === new Date(searchDate).toISOString().split("T")[0])
            // setOrders(orders?.filter(order => new Date(order.date).toISOString().split("T")[0] === new Date(searchDate).toISOString().split("T")[0]))
        }
        if(orderState && orderState !== "all"){
            filteredOrders = filteredOrders.filter(order => order.status === orderState)
            console.log(filteredOrders);
            // setOrders(orders?.filter(order => order.status === orderState))
        }
        setOrders(filteredOrders)
    }, [searchDate, orderState])


    return (
        <div className="w-full my-4 bg-white px-24 pb-24 pt-20 rounded-l-lg flex flex-col max-w-[80%] gap-2">
            <div className="flex flex-col justify-between">
                <h1 className="font-bold text-4xl text-primary">Historial de Envios</h1>
                <div className="flex flex-row gap-4 justify-end">
                    <div className="flex flex-col items-start ">
                    <input type="date" onChange={(e) => setSearchDate(e.target.value)} className="bg-primary text-white p-2 rounded-lg px-2 outline-none h-fit" />
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
                        <option value="receipted">Recibido</option>
                        <option value="acepted">Aceptado</option>
                        <option value="sending">En Progreso</option>
                        <option value="delivered">Entregado</option>
                        <option value="cancelled">Cancelado</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-row font-bold p-4 rounded-lg justify-between items-center">
                <h3>Fecha</h3>
                <h3>Precio</h3>
                <h3>Estado de<br/>la orden</h3>
            </div>
            <div className="flex flex-col gap-4">
                {orders ? orders.map((order, i) => (
                    <div className="flex flex-row bg-primary text-white p-4 rounded-lg justify-between" key={i}>
                        <h3>{new Date(order.date).toLocaleDateString()}</h3>
                        <h3>${order.final_price}</h3>
                        <h3>{(order.status).toUpperCase()}</h3>
                    </div>
                    )) : (
                        <div className="flex flex-row bg-primary text-white p-4 rounded-lg justify-between">
                            <h3 className="text-center font-bold">No hay ordenes</h3>
                        </div>
                    )
                }
            </div>
            
        </div>
    )
}