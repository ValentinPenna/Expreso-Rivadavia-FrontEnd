import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Input } from "./secondary/Input";
import Button from "./secondary/Button";
import { validateLogin } from "./validation/validateLogin";
import type { LoginResponse, UserLogin } from "../types/user";
import { useUserStore } from "../store/userStore";

const FormLogin = () => {
  const [login, setLogin] = useState(false);
  const getUser = useUserStore((state: any) => state.getUser);
  const loginUser = useUserStore((state: any) => state.loginUser);
  
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values: UserLogin, { resetForm }) => {
          await loginUser(values)
          .then((data: LoginResponse) => {
            getUser(data.userId)
            .then(() => {
              setLogin(true);
              // window.location.href = "/";
              console.log(data);
            })
            
            // resetForm();
          })
          .catch((error:any) => console.log(error));
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

            <Input
              error={errors.password}
              label="Contraseña"
              type="password"
              name="password"
              placeholder="*********"
            />
            <Button type="submit" children="Iniciar Sesión" className="mt-6" />
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
