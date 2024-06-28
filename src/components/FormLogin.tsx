import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Input } from "./secondary/Input";
import Button from "./secondary/Button";
import { validateLogin } from "./validation/validateLogin";
// import { useUserStore } from "../store/userStore";
// import type { UserLogin } from "../types/user";

const FormLogin = () => {
  const [login, setLogin] = useState(false);

  // const setUser = useUserStore((state: any) => state.setUser);

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values: any, { resetForm }) => {
          resetForm();
          setLogin(true);
          console.log(values);

          // setUser(values);
        }}
        validate={validateLogin}
      >
        {({ errors }) => (
          <Form className=" w-lg flex flex-col bg-white p-6 items-center rounded-lg  shadow-lg">
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
