import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Input } from './secondary/Input'
import Button from './secondary/Button'
import type { IRegisterUser } from './types/typesRegister'
import validateUser from './validation/validateUser'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useUserStore } from '../store/userStore'
import type { RegisterResponse } from '../types/user'
import { toast} from 'react-toastify'

interface RegisterUserProps {
  handleBackToSelection: () => void;  
}


const RegisterUser: React.FC<RegisterUserProps>= ({handleBackToSelection}) => {
    const [registerUser, setRegisterUser]= useState(false)
    const [password, setPassword]= useState(true)

    const passwordVisibility = () => {
      setPassword(!password);
    };

  const userRegister = useUserStore((state: any) => state.userRegister);
  return (
    <div>
        <Formik
        initialValues={{
           email: "",
           dni:"",
           name:"",
           lastName:"",
           address:"",
           locality:"",
           password:"",
           confirmPassword:"",
        }}
        validate={validateUser}
        onSubmit={ (values: IRegisterUser)=>{
           userRegister(values)
          .then((data: boolean) => {
            // console.log(data)
            if ((data)){
              setRegisterUser(true);
              toast.success("Usuario registrado con éxito");
              setTimeout(() => {
                window.location.href = "/auth/login";
              }, 1000);
            } 
          })
          .catch((error: any) => {
            console.log(error);
          });
        }}
        >
          {({ errors })=>(
            <Form  className=" w-lg flex flex-col bg-white p-6  rounded-lg  shadow-lg my-10 relative">
              <div className='text-center'>
                <h1 className="text-primary text-4xl font-bold ">Registrarse</h1>
                <p>completa todos los campos para crear una cuenta</p>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-x-20 ' >
                <Input label="Email" name="email" placeholder='xxxx@mail.com' error={errors.email} ></Input>
                <Input label="DNI" name="dni" placeholder='44444444' error={errors.dni}></Input>
                <Input label="Nombre" name="name" placeholder='Roberto' error={errors.name}></Input>
                <Input label="Apellido" name="lastName" placeholder='Martinez' error={errors.lastName} ></Input>
                <Input label="Dirección" name="address" placeholder='calle 123' error={errors.address}></Input>
                <Input label="Localidad" name="locality" placeholder='Springfield' error={errors.locality}></Input>  
                <div className='relative'>
                <Input label="Contraseña" name="password" placeholder='*******' type={password ? "password" : "text"} error={errors.password} ></Input>
                <div onClick={passwordVisibility} className="absolute right-0 top-2/3 transform -translate-y-1/2 cursor-pointer">
                {!password ? (
                      <AiFillEyeInvisible color="red" />
                    ) : (
                      <AiFillEye color="red" />
                    )}
                    </div>
                    </div>
                    <div className='relative'>
                <Input label="Confirmar contraseña" name="confirmPassword" placeholder='*******' type={password ? "password" : "text"} error={errors.confirmPassword}></Input>
                <div onClick={passwordVisibility} className="absolute right-0 top-2/3  transform  cursor-pointer">
                {!password ? (
                      <AiFillEyeInvisible color="red" />
                    ) : (
                      <AiFillEye color="red" />
                    )}
                    </div>
                  </div>
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
export default RegisterUser
