import { useState } from "react";
import { Formik, Form } from "formik";
import validate from "./validation/validate";
import { Input } from "./secondary/Input";
import Button from "./secondary/Button";

export interface Quote {
  origin: string;
  destination: string;
  weight: string;
  high: string;
  long: string;
  widht: string;
}
export interface QuoteError {
  origin?: string;
  destination?: string;
  weight?: string;
  high?: string;
  long?: string;
  widht?: string;
}

export default function QuoteShipping() {
  const [quote, setQuote] = useState(false);

  return (
    <div className="px-4 md:px-8">
      <Formik
        initialValues={{
          origin: "",
          destination: "",
          weight: "",
          high: "",
          long: "",
          widht: "",
        }}
        validate={validate}
        onSubmit={(values: Quote, { resetForm }) => {
          resetForm();
          setQuote(true);
          
          
        }}
      >
        {({ errors}) => (
          <Form className="max-w-4xl mx-auto">
            <div>
              <h1 className="text-[#CB1B1A] font-bold lg:text-5xl md:text-4xl text-2xl text-center">
                Cotización
              </h1>
            </div>
            <div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-2">
                  <Input
                    label="Ciudad de origen"
                    name="origin"
                    placeholder="calle 123"
                    error={errors.origin}
                  />
                </div>
                <div className="w-full md:w-1/2 p-2">
                  <Input
                    label="Ciudad de destino"
                    name="destination"
                    placeholder="calle 1235"
                    error={errors.destination}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="w-full md:w-1/4 p-2">
                  <Input label="Peso" name="weight" placeholder="3kg" error={errors.weight} />
                </div>
                <div className="w-full md:w-1/4 p-2">
                  <Input label="Alto" name="high" placeholder="50cm" error={errors.high}/>
                </div>
                <div className="w-full md:w-1/4 p-2">
                  <Input label="Largo" name="long" placeholder="30cm" error={errors.long} />
                </div>
                <div className="w-full md:w-1/4 p-2">
                  <Input label="Ancho" name="widht" placeholder="60cm" error={errors.widht} />
                </div>
              </div>
              <div className="m-20 flex justify-center">
                <Button type="submit">
                  COTIZAR
                </Button>
              </div>
            </div>
            {quote && <p>cotizacion de envio</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
