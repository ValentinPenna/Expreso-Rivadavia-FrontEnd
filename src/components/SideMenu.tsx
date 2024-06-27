export default function SideMenu(){
    return(
        <nav className="flex flex-col gap-24 items-center bg-white my-4 mr-4 rounded-r-lg pb-20 pr-6 min-w-[20%] w-[20%]">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="w-48 pt-14"/> 
            <div className="flex flex-col gap-9 text-xl items-start w-full">
                <div className="flex flex-row h-full">
                    { window.location.pathname === "/dashboard" ?<><div className="h-7 w-3 bg-primary"></div><a href="/dashboard/user-info" className="font-bold pl-3">Información del Usuario</a></>:
                    <a href="/dashboard" className="font-normal pl-3">Información del Usuario</a>} 
                </div>
                <div className="flex flex-row h-fit">
                    { window.location.pathname === "/dashboard/shipments" ?<><div className="h-full w-3 bg-primary">.</div><a href="/dashboard/shipments" className="font-bold pl-3">Historial de envios</a></>: 
                    <a href="/dashboard/shipments" className="font-normal pl-3">Historial de envios</a>} 
                </div>
                <div className="flex flex-row h-fit">
                    { window.location.pathname === "/dashboard/security" ?<><div className="h-full w-3 bg-primary">.</div><a href="/dashboard/security" className="font-bold pl-3">Seguridad</a></>: 
                    <a href="/dashboard/security" className="font-normal pl-3">Seguridad</a>} 
                </div>
            </div>
        </nav>
    )
}