import { useEffect } from "react"
import { useUserStore } from "../store/userStore"
import Button from "./secondary/Button"

export default function SwitchGuestUser() {
    const token:string = useUserStore((state) => state.token)
    const {setUser, setToken} = useUserStore((state) => state)
    useEffect(() => {
        setUser()
        setToken()
        console.log("prueba")
    }, [])
    return (
        <>
        {!token ?(
        <div className="flex flex-row gap-6">
            <button className="w-fit p-2 transition-all duration-300 bg-white text-primary border-2 border-primary rounded-full text-xl font-bold hover:bg-primary hover:text-white hover:border-2" onClick={() => location.href='/auth/login'}>Ingresar</button>
            <Button className="w-fit" onClick={() => location.href='/auth/register'}>Registrarse</Button>
        </div>
      ) : (
        <>
          <button className="" onClick={() => (location.href = "/dashboard")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              preserveAspectRatio="none"
            >
              <path
                fill="#CB1B1A"
                d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 
                    4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 
                    1.413T18 20H6q-.825 0-1.412-.587T4 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15t-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6-8q.825 0 1.413-.587T14 
                    8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0 8"
              />
            </svg>
          </button>
        </>
      )}
    </>
  );
}
