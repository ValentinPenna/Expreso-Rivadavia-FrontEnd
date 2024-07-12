import { useEffect, useState } from "react"
import { useUserStore } from "../store/userStore"
import type { User } from "../types/user"

export default function AdminUsers() {
    const getUsers = useUserStore((state) => state.getUsers)
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        getUsers().then((users) => setUsers(users)).catch((err) => console.log(err))
    })
    return (
        <main className="flex flex-col p-6 gap-6 min-h-[80vh]">
            <a href="/dashboard/admin" className="hover:text-primary text-lg bg-white w-fit px-3 rounded-lg font-bold">Volver</a>
            <h1 className="text-4xl font-bold text-primary text-center">Listado de usuarios</h1>
            <div className="flex flex-col gap-3">
                {users.map((user) => (
                    <div key={user.id} className="flex flex-row bg-white shadow-lg justify-between p-6 text-lg rounded-lg">
                    {user.dni?
                        <>
                        <h3 className="w-1/4 text-start">{user.lastName}, {user.name}</h3>
                        <h3 className="w-1/4 text-center">{user.email}</h3>
                        <h3 className="w-1/4 text-center">{user.dni}</h3>
                        <h3 className="w-1/4 text-end">{user.role === "user" ? "Usuario" : user.role === "admin" ? "Administrador" : user.role === "transporte" ? "Transporte" : user.role}</h3>
                        </>:
                        <>
                        <h3 className="w-1/5 text-start">{user.lastName}, {user.name}</h3>
                        <h3 className="w-1/5 text-center">{user.email}</h3>
                        <h3 className="w-1/5 text-center">{user.cuit_cuil}</h3>
                        <h3 className="w-1/5 text-center">{user.companyName}</h3>
                        <h3 className="w-1/5 text-end">{user.role}</h3>
                        </>
                        }
                    </div>
                ))}
            </div>
        </main>
    )
}