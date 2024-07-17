import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Input } from "./secondary/Input";
import Button from "./secondary/Button";
import { validateLogin } from "./validation/validateLogin";
import type { LoginResponse, UserLogin } from "../types/user";
import { useUserStore } from "../store/userStore";
import { auth } from "../helpers/auth";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import LoginGoogle from "./LoginGoogle";
import { authFireBase, provider } from "../firebase/firebase";
import {
  getAdditionalUserInfo,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";

const FormLogin = () => {
  const [login, setLogin] = useState(false);
  const getUser = useUserStore((state: any) => state.getUser);
  const loginUser = useUserStore((state: any) => state.loginUser);
  const [password, setPassword] = useState(true);
  const googleLogin = useUserStore((state: any) => state.googleLogin);

  useEffect(() => {
    const isAuth = auth();
    if (isAuth) window.location.href = "/";
  }, []);

  const passwordVisibility = () => {
    setPassword(!password);
  };

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
          lastName: aditionalinfo?.profile?.family_name as string || "",
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
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values: UserLogin, { resetForm }) => {
          loginUser(values)
            .then((data: LoginResponse) => {
              getUser(data.userId).then(() => {
                setLogin(true);
                toast.success("Usuario conectado");
                resetForm();
                setTimeout(() => {
                  window.location.href = "/";
                }, 1000);
                // console.log(data);
              });
            })
            .catch((error: any) => {
              toast.error("El usuario no pudo iniciar sesión");
            });
        }}
        validate={validateLogin}
      >
        {({ errors }) => (
          <Form className=" w-lg flex flex-col bg-white p-6 items-center rounded-lg  shadow-lg my-20">
            <div>
              <h1 className="text-primary text-4xl font-bold text-center">
                Iniciar Sesión
              </h1>
            </div>

            <Input
              error={errors.email}
              label="Email"
              name="email"
              placeholder="Email"
            />
            <div className="relative">
              <Input
                error={errors.password}
                label="Contraseña"
                type={password ? "password" : "text"}
                name="password"
                placeholder="*********"
              />
              <div
                onClick={passwordVisibility}
                className="absolute right-0 top-2/3  transform  cursor-pointer"
              >
                {!password ? (
                  <AiFillEyeInvisible color="red" />
                ) : (
                  <AiFillEye color="red" />
                )}
              </div>
            </div>

            <Button
              type="submit"
              children="Iniciar Sesión"
              className="mt-6 hover:bg-primary hover:text-white"
            />
            <div className="mt-4 flex justify-center items-center">
              <LoginGoogle />
            </div>
            <p className="text-sm mt-4">
              No tienes cuenta?{" "}
              <a className="font-bold text-primary" href="/auth/register">
                Registrate
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormLogin;
