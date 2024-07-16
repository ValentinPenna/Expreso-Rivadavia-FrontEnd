import { useEffect, useState } from "react"
import { useUserStore } from "../store/userStore"
import type { User } from "../types/user"
import { toast } from "react-toastify"
import { MdDelete } from "react-icons/md";
import Modal from "./secondary/Modal";

export default function AdminUsers() {
    const getUsers = useUserStore((state) => state.getUsers)
    const [users, setUsers] = useState<User[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const [idToDelete, setIdToDelete] = useState<string>("")
    useEffect(() => {
        getUsers().then((users) => setUsers(users)).catch((err) => console.log(err))
    })

    const deleteUser = useUserStore((state) => state.deleteUser)
    const handleDelete = () => {
        deleteUser(idToDelete).then((data) => {
            if (Object.keys(data).includes("id")) {
                toast.success("Usuario eliminado")
            } else {
                toast.error("No se pudo eliminar el usuario, error: " + data.message)
            }
            setIdToDelete("")
            setShowModal(false)
        }).catch((err) => console.log(err))
        getUsers().then((users) => setUsers(users.filter((user) => user.isDeleted !== true))).catch((err) => console.log(err))
    }

    return (
        <main className="flex flex-col p-6 gap-6 min-h-[80vh]">
            <div className="flex justify-between items-center">

            <a href="/dashboard/admin" className="hover:text-primary text-lg bg-white w-fit px-3 rounded-lg font-bold">Volver</a>
            <button onClick={() => window.location.href = "/dashboard/admin/users-reviews"} className="bg-primary text-white p-2 rounded-lg px-3 font-bold">Ver Comentarios</button>
            </div>

            <h1 className="text-4xl font-bold text-primary text-center">Listado de usuarios</h1>
            <div className="flex flex-col gap-3">
                {users.map((user) => (
                    <div key={user.id} className="flex flex-row bg-white shadow-lg justify-between p-6 text-lg rounded-lg">
                    {user.dni?
                        <>
                        <h3 className="w-1/4 text-start">{user.lastName}, {user.name}</h3>
                        <h3 className="w-1/4 text-center">{user.email}</h3>
                        <h3 className="w-1/4 text-center">{user.dni}</h3>
                        <div className="flex flex-row gap-3 justify-end w-1/4">
                        <h3 className="w-fit">{user.role === "user" ? "Usuario" : user.role === "admin" ? "Administrador" : user.role === "transporte" ? "Transporte" : user.role}</h3>
                        <button onClick={() => {setShowModal(true); setIdToDelete(user.id)}} className="justify-self-end">
                            <MdDelete size={25}/>
                        </button>
                        </div>
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
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">¿Deseas eliminar este usuario?</h1>
                    <p className="text-xl text-primary text-center">Esta accion no se puede deshacer</p>
                    </div>
                    <div className="flex justify-between">
                    <button onClick={() => {setShowModal(false); setIdToDelete("")}} className="w-1/3 bg-primary text-white rounded-full text-lg font-bold">Cancelar</button>
                    <button onClick={handleDelete} className="w-1/3 bg-primary text-white rounded-full text-lg font-bold">Eliminar</button>
                    </div>
                </div>
            </Modal>
        </main>
    )
}