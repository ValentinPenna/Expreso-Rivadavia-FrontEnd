import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validate from "./validation/validateQuote";
import { Input } from "./Input";

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
    <div>
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
        onSubmit={() => {
          setQuote(true);
        }}
      >
        {({ errors }) => (
          <Form className=" w-[1040px]">
            <div>
              <h1 className="text-[#CB1B1A] font-bold text-5xl text-center">
                Cotizacion
              </h1>
            </div>
            <div>
              <div className="flex">
                <div className="w-1/2">
                  <Input
                    label="Ciudad de origen"
                    name="origin"
                    placeholder="calle 123"
                  />
                  <ErrorMessage
                    name="origin"
                    component={() => <div>{errors.origin}</div>}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="Ciudad de destino"
                    name="destination"
                    placeholder="calle 1235"
                  />
                  <ErrorMessage
                    name="destination"
                    component={() => <div>{errors.destination}</div>}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div>
                  <Input label="Peso" name="weight" placeholder="3kg" />
                  <ErrorMessage
                    name="weight"
                    component={() => <div>{errors.weight}</div>}
                  />
                </div>
                <div>
                  <Input label="Alto" name="high" placeholder="50cm" />
                  <ErrorMessage
                    name="high"
                    component={() => <div>{errors.high}</div>}
                  />
                </div>
                <div>
                  <Input label="Largo" name="long" placeholder="30cm" />
                  <ErrorMessage
                    name="long"
                    component={() => <div>{errors.long}</div>}
                  />
                </div>
                <div>
                  <Input label="Ancho" name="widht" placeholder="60cm" />
                  <ErrorMessage
                    name="widht"
                    component={() => <div>{errors.widht}</div>}
                  />
                </div>
              </div>
              <div className="m-20 flex justify-center">
                <button
                  className="bg-[#CB1B1A] text-white text-xl border rounded-full w-[300px] p-2"
                  type="submit"
                >
                  COTIZAR
                </button>
              </div>
            </div>
            {quote && <p>cotizacion de envio</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
