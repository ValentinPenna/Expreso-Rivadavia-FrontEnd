import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Input } from './secondary/Input'
import Button from './secondary/Button'

export default function RegisterUser() {
    const [registerUser, setRegisterUser]= useState(false)


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
        onSubmit={()=>{}}
        >
          {({ errors })=>(
            <Form>
              <div>
                <h1>Registrarse</h1>
                <p>completa todos los campos para crear una cuenta</p>
              </div>
              <div>
                <Input label="email" name="email" placeholder='xxxx@mail.com' ></Input>
                <Input label="dni" name="dni" placeholder='44444444' ></Input>
                <Input label="name" name="name" placeholder='Roberto' ></Input>
                <Input label="lastName" name="lastName" placeholder='Martinez' ></Input>
                <Input label="adddress" name="address" placeholder='calle 123' ></Input>
                <Input label="password" name="password" placeholder='*******' ></Input>
                <Input label="confirmPassword" name="confirmPassword" placeholder='*******' ></Input>
              </div>
              <div>
                <Button type="submit" >Registrarse</Button>
              </div>
            </Form>
          )}
        </Formik>
      
    </div>
  )
}
