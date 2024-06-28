import { Field, Form, Formik } from 'formik';
import React from 'react'
import Button from './secondary/Button';
import { Input } from './secondary/Input';
import { validateShipment } from './validation/validateShipment';
import type { IShipment } from './types/typesRegister';

const Shipment = () => {
  return (
    <div className="px-4 md:px-8 z-50">
      <Formik
        initialValues={{
          locality_origin: "",
          locality_destination: "",
          size: "",
          address_origin: "",
          address_destination:"",
          
        }}
        validate={validateShipment}
        onSubmit={(values: IShipment, { resetForm }) => {
          resetForm();
          
        }}
      >
        {({errors}) => (
          <Form className="max-w-4xl mx-auto bg-white p-4 my-4 rounded-lg shadow-lg">
          <div>
            <h1 className="text-primary font-bold lg:text-5xl md:text-4xl text-2xl text-center">
              Realizar envío
            </h1>
          </div>
          <div className="text-xl lg:text-2xl m-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div>
                <label htmlFor="locality_origin" className="flex items-center space-x-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="30" viewBox="0 0 304 432" className="mr-2">
                    <path fill="#CB1B1A" d="M149 3q62 0 106 43.5T299 152q0 31-15.5 71.5t-37.5 75t-44 65t-37 48.5l-16 17q-6-6-16-18t-35.5-46.5t-45.5-67T16 224T0 152Q0 90 43.5 46.5T149 3m0 202q22 0 38-15.5t16-37.5t-16-37.5T149 99t-37.5 15.5T96 152t15.5 37.5T149 205"/>
                  </svg>
                  Ciudad de origen:
                </label>
                <Field as="select" id="locality_origin" name="locality_origin" className="p-1 focus:border focus:rounded-lg focus:outline-none focus:border-primary hover:border-primary w-56">
                  <option value="chapanay">Chapanay</option>
                  <option value="ciudad de mendoza">Ciudad de Mendoza</option>
                  <option value="corralitos">Corralitos</option>
                  <option value="fray luis beltran">Fray Luis Beltrán</option>
                  <option value="godoy cruz">Godoy Cruz</option>
                  <option value="guaymallen">Guaymallén</option>
                  <option value="ingeniero giagnoni">Ingeniero Giagnoni</option>
                  <option value="junin">Junín</option>
                  <option value="las heras">Las Heras</option>
                  <option value="lavalle">Lavalle</option>
                  <option value="los barriales">Los Barriales</option>
                  <option value="lujan de cuyo">Luján de Cuyo</option>
                  <option value="maipu">Maipú</option>
                  <option value="medrano">Medrano</option>
                  <option value="palmira">Palmira</option>
                  <option value="rivadavia">Rivadavia</option>
                  <option value="rodriguez peña">Rodriguez Peña</option>
                  <option value="rodeo de la cruz">Rodeo de la Cruz</option>
                  <option value="rodeo del medio">Rodeo del Medio</option>
                  <option value="tres porteñas">Tres Porteñas</option>
                </Field>
                <Input label="Dirección de origen" name="address_origin" placeholder='calle 123' error={errors.address_origin} ></Input>
              </div>
              <div>
                <label htmlFor="locality_destination" className="flex items-center space-x-2 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="35" viewBox="0 0 24 24" className="mr-2">
                    <path fill="#CB1B1A" d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75"/>
                  </svg>
                  Ciudad de destino:
                </label>
                <Field as="select" id="locality_destination" name="locality_destination" className="p-1 focus:border focus:rounded-lg focus:outline-none focus:border-primary hover:border-primary w-56">
                  <option value="chapanay">Chapanay</option>
                  <option value="ciudad de mendoza">Ciudad de Mendoza</option>
                  <option value="corralitos">Corralitos</option>
                  <option value="fray luis beltran">Fray Luis Beltrán</option>
                  <option value="godoy cruz">Godoy Cruz</option>
                  <option value="guaymallen">Guaymallén</option>
                  <option value="ingeniero giagnoni">Ingeniero Giagnoni</option>
                  <option value="junin">Junín</option>
                  <option value="las heras">Las Heras</option>
                  <option value="lavalle">Lavalle</option>
                  <option value="los barriales">Los Barriales</option>
                  <option value="lujan de cuyo">Luján de Cuyo</option>
                  <option value="maipu">Maipú</option>
                  <option value="medrano">Medrano</option>
                  <option value="palmira">Palmira</option>
                  <option value="rivadavia">Rivadavia</option>
                  <option value="rodriguez peña">Rodriguez Peña</option>
                  <option value="rodeo de la cruz">Rodeo de la Cruz</option>
                  <option value="rodeo del medio">Rodeo del Medio</option>
                  <option value="tres porteñas">Tres Porteñas</option>
                </Field>
                <Input label="Dirección de destino" name="address_destination" placeholder='calle 123' error={errors.address_destination}></Input>
              </div>
            </div>
            <div className="flex flex-col items-center mt-5">
              <label htmlFor="size" className="flex items-center space-x-2 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="50" viewBox="0 0 24 24" className="mr-2">
                  <path fill="none" stroke="#CB1B1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 3l8 4.5v9L12 21l-8-4.5v-9zm0 9l8-4.5M12 12v9m0-9L4 7.5m12-2.25l-8 4.5"/>
                </svg>
                Selecciona un tamaño:
              </label>
              <div role="group" aria-labelledby="size" className="flex flex-col lg:flex-row">
                <label htmlFor="size-pequeño" className="flex items-center space-x-2 mb-2 md:mb-0 ml-5">
                 
                  <Field type="radio" id="size-pequeño" name="size" value="pequeño" />
                  <div className="flex  flex-col items-center space-x-2">
                  <span className="ml-2 mr-6 ">Pequeño</span>
                  <span className="text-sm md:ml-0 text-primary">Máximo de 150cm / 10000 grs</span>
                  </div>
                </label>
                <label htmlFor="size-mediano" className="flex items-center space-x-2 mb-2 md:mb-0 ml-5">
                  <Field type="radio" id="size-mediano" name="size" value="mediano" />
                  <div className="flex  flex-col items-center space-x-2">
                  <span className="ml-2 mr-6 ">Mediano</span>
                  <span className="text-sm md:ml-0 text-primary">Máximo de 300cm / 25000 grs</span>
                  </div>
                </label>
                <label htmlFor="size-grande" className="flex items-center space-x-2 mb-2 md:mb-0 ml-5">
                  <Field type="radio" id="size-grande" name="size" value="grande"/>
                  <div className="flex  flex-col items-center space-x-2">
                  <span className="ml-2 mr-6 ">Grande</span>
                  <span className="text-sm md:ml-0 text-primary">Máximo de 495cm / 50000 grs</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="mt-10 mb-5 flex justify-center">
              <Button type="submit">
                CREAR ENVIO
              </Button>
            </div>
          </div>
          
        </Form>
        )}
          
     
      </Formik>
    </div>
  )
}

export default Shipment