import React, { useState } from 'react'
import { useUserStore } from '../store/userStore';
import { getAdditionalUserInfo, signInWithPopup, type UserCredential } from 'firebase/auth';
import { authFireBase, provider } from '../firebase/firebase';
import type { LoginResponse } from '../types/user';
import { toast } from 'react-toastify';
import Button from './secondary/Button';

const LoginGoogle = () => {
    const googleLogin = useUserStore((state: any) => state.googleLogin);
    const [login, setLogin] = useState(false);
    const getUser = useUserStore((state: any) => state.getUser);

    const handleGoogle = async () => {
        try {
          const result: UserCredential = await signInWithPopup(
            authFireBase,
            provider
          );
          // console.log(result);
          // mando el email a un endpont de back para rectificar su excistencia
    
          const aditionalinfo = getAdditionalUserInfo(result);
          // console.log(aditionalinfo);
    
          const isNewUser = aditionalinfo?.isNewUser;
          if (isNewUser) {
            const userGoogleInfo = {
              email: result.user.email as string,
              lastName: aditionalinfo?.profile?.family_name as string,
              name: aditionalinfo?.profile?.given_name as string,
            };
            localStorage.setItem("infoGoogle", JSON.stringify(userGoogleInfo));
    
            // hace hace register con lo valores que no me trae el result.user
            window.location.href = "/auth/registergoogle";
          } else {
            const logGoogle: LoginResponse = await googleLogin(result.user.email);
            // se hara la logica del login donde se va a guardar todo en zustand
            // console.log(logGoogle);
            localStorage.setItem("token", logGoogle.token);
            getUser(logGoogle.userId).then(() => {
              setLogin(true);
              toast.success("Usuario conectado");
              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
            });
          }
        } catch (error) {
          console.log(error);
        }}
  return (
    <div>
      <Button className="text-xs p-0.5 w-fit" onClick={handleGoogle}>
              Iniciar sesión con google
     </Button>
    </div>
  )
}

export default LoginGoogle
