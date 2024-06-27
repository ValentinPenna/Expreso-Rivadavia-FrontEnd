import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Input } from './secondary/Input'
import Button from './secondary/Button'
import type { IRegisterCompany, IRegisterUser } from './types/typesRegister'
import validateCompany from './validation/validateCompany'

interface RegisterCompanyProps {
  handleBackToSelection: () => void;  
}

const RegisterCompany: React.FC<RegisterCompanyProps> =({ handleBackToSelection }) => {
    const [registerCompany, setRegisterCompany]= useState(false)


  return (
    <div>
        <Formik
        initialValues={{
           email: "",
           cuit_cuil:"",
           companyName: "",
           name:"",
           lastName:"",
           address:"",
           locality:"",
           password:"",
           confirmPassword:"",
        }}
        validate={validateCompany}
        onSubmit={(values: IRegisterCompany)=>{}}
        >
          {({ errors })=>(
            <Form  className=" w-lg flex flex-col bg-white p-6  rounded-lg  shadow-lg my-10 relative">
              <div className='text-center'>
                <h1 className="text-primary text-4xl font-bold ">Registrarse</h1>
                <p>completa todos los campos para crear una cuenta</p>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-x-20' >
                <Input label="Email" name="email" placeholder='xxxx@mail.com' error={errors.email}></Input>
                <Input label="CUIL" name="cuit_cuil" placeholder='44444444' error={errors.cuit_cuil}></Input>
                <Input label="Nombre de la empresa" name="companyName" placeholder='Expreso Rivadavia' error={errors.companyName}></Input>
                <Input label="Nombre" name="name" placeholder='Roberto' error={errors.name}></Input>
                <Input label="Apellido" name="lastName" placeholder='Martinez'error={errors.lastName} ></Input>
                <Input label="Dirección" name="address" placeholder='calle 123' error={errors.address}></Input>
                <Input label="Contraseña" name="password" placeholder='*******' type="password" error={errors.password}></Input>
                <Input label="Confirmar contraseña" name="confirmPassword" placeholder='*******' type="password" error={errors.confirmPassword}></Input>
              </div>
              <div className="mt-10 mb-5 flex flex-col justify-center items-center">
                <Button type="submit">Registrarse</Button>
              <span className='m-5'>Ya tienes cuenta?<a href='/auth/login' className='text-primary'> Inicia sesión</a></span>
              </div>
              {handleBackToSelection && (
                <button
                  type="button"
                  className=" text-primary absolute"
                  onClick={handleBackToSelection}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 42 42"><path fill="currentColor" fillRule="evenodd" d="M31 38.32L13.391 21L31 3.68L28.279 1L8 21.01L28.279 41z"/></svg>
                </button>
              )}
            </Form>
          )}
        </Formik>
      
    </div>
  )
}

export default RegisterCompany