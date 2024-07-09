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



const FormLogin = () => {
  const [login, setLogin] = useState(false);
  const getUser = useUserStore((state: any) => state.getUser);
  const loginUser = useUserStore((state: any) => state.loginUser);
  const [password, setPassword]= useState(true)

  useEffect(() => {
    const isAuth = auth();
    if (isAuth) window.location.href = "/";
  }, []);

  
  const passwordVisibility = () => {
    setPassword(!password);
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
          <Form className="relative w-lg flex flex-col bg-white p-6 items-center rounded-lg  shadow-lg my-20">
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
            <div onClick={passwordVisibility} className="absolute right-0 top-2/3  transform  cursor-pointer">
                {!password ? (
                      <AiFillEyeInvisible color="red" />
                    ) : (
                      <AiFillEye color="red" />
                    )}
                    </div>
                    </div>
            
            <Button type="submit" children="Iniciar Sesión" className="mt-6" />
            <p className="text-sm mt-4">
              No tienes cuenta?{" "}
              <a className="font-bold text-primary" href="/auth/register">
                Registrate
              </a>
              <div className="mt-4 flex justify-center items-center">
              <LoginGoogle/>
              </div>
            </p>          
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormLogin;
