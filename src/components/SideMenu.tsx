export default function SideMenu(){
    console.log(window.location.pathname)
    return(

        <nav className="flex flex-col gap-24">
            {/* <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" />  */}
            <div className="flex flex-col gap-12 text-xl">
                <div className="flex flex-row h-fit">

                { window.location.pathname === "/" ?<div className="h-max w-3 bg-primary"></div>:"" } 
                <a href="/dashboard/user-info" className="font-bold pl-3">Información del Usuario</a>
                </div>
            </div>
        </nav>
    )
}