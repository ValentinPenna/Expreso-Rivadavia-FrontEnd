import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input } from "./secondary/Input";
import Button from "./secondary/Button";

interface ILogin {
  email: string;
  password: string;
}

const FormLogin = () => {
  const [login, setLogin] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values: ILogin, { resetForm }) => {
          resetForm();
          setLogin(true);
        }}
      >
        <Form className=" w-lg flex flex-col bg-white p-6  rounded-lg  shadow-lg">
          <div>
            <h1 className="text-primary text-4xl font-bold text-center">
              Iniciar Sesión
            </h1>
          </div>

          <Input label="Email" name="email" placeholder="Email" />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="*******"
          />

          <Button type="submit" children="Iniciar Sesión" className="mt-6" />
        </Form>
      </Formik>
    </div>
  );
};

export default FormLogin;
