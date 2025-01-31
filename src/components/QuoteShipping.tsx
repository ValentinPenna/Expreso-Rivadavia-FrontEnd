import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";

import Button from "./secondary/Button";
import { useOrdersStore } from "../store/ordersStore";
import type {
  ILocality,
  IordersQuotationsModalProps,
} from "../types/shipments";
import Modal from "./secondary/Modal";
import { toast } from "react-toastify";

export interface Quote {
  origin: string;
  destination: string;
  size: string;
}

export default function QuoteShipping() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] =
    useState<IordersQuotationsModalProps | null>(null);
  const [quote, setQuote] = useState(false);
  const [localities, setLocalities] = useState<ILocality[]>([]);
  const quotation = useOrdersStore((state) => state.quotation);
  const getLocalities = useOrdersStore((state) => state.getLocalities);

  useEffect(() => {
    async function fetchLocalities() {
      const data = await getLocalities();
      // console.log(data)
      setLocalities(data);
    }
    fetchLocalities();
  }, []);

  return (
    <div className="px-4 md:px-8 z-50">
      <Formik
        initialValues={{
          origin: "0",
          destination: "0",
          size: "",
        }}
        onSubmit={(values: Quote) => {
          quotation({
            size: values.size,
            locality_origin: Number(values.origin),
            locality_destination: Number(values.destination),
          })
            .then((data: any) => {
              if (values.size === "envelop") values.size = "Sobre";
              if (values.size === "small") values.size = "Pequeño";
              if (values.size === "medium") values.size = "Mediano";
              if (values.size === "large") values.size = "Grande";
              setModalData({
                size: values.size,
                locality_origin: Number(values.origin),
                locality_destination: Number(values.destination),
                price: data,
              });
            })
            .catch((err) => {
              setOpen(false);
              toast.error(
                "Rellena todos los campos para realizar la cotización"
              );
            });
          setOpen(true);
          setQuote(true);
        }}
      >
        <Form className="max-w-4xl mx-auto bg-white p-4 my-4 rounded-lg  shadow-lg">
          <div>
            <h1 className="text-primary font-bold lg:text-5xl md:text-4xl text-2xl text-center">
              Cotizar envío
            </h1>
          </div>
          <div className="text-xl sm:text-2xl my-3 md:m-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <label
                  htmlFor="origin"
                  className="flex items-center space-x-2 text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="30"
                    viewBox="0 0 304 432"
                    className="mr-2"
                  >
                    <path
                      fill="#CB1B1A"
                      d="M149 3q62 0 106 43.5T299 152q0 31-15.5 71.5t-37.5 75t-44 65t-37 48.5l-16 17q-6-6-16-18t-35.5-46.5t-45.5-67T16 224T0 152Q0 90 43.5 46.5T149 3m0 202q22 0 38-15.5t16-37.5t-16-37.5T149 99t-37.5 15.5T96 152t15.5 37.5T149 205"
                    />
                  </svg>
                  Ciudad de origen:
                </label>
                <Field
                  as="select"
                  id="origin"
                  name="origin"
                  className="p-1 focus:border focus:rounded-lg focus:outline-none focus:border-primary hover:border-primary w-56"
                >
                  <option value={0}>Seleccionar</option>
                  {localities?.map((locality) => (
                    <option key={locality.id} value={locality.id}>
                      {locality.name}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="flex items-center space-x-2 text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="35"
                    viewBox="0 0 24 24"
                    className="mr-2"
                  >
                    <path
                      fill="#CB1B1A"
                      d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75"
                    />
                  </svg>
                  Ciudad de destino:
                </label>
                <Field
                  as="select"
                  id="destination"
                  name="destination"
                  className="p-1 focus:border focus:rounded-lg focus:outline-none focus:border-primary hover:border-primary w-56"
                >
                  <option value={0}>Seleccionar</option>
                  {localities?.map((locality) => (
                    <option key={locality.id} value={locality.id}>
                      {locality.name}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <div className="flex flex-col items-center mt-5">
              <label
                htmlFor="size"
                className="flex items-center space-x-2 text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="50"
                  viewBox="0 0 24 24"
                  className="mr-2"
                >
                  <path
                    fill="none"
                    stroke="#CB1B1A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m12 3l8 4.5v9L12 21l-8-4.5v-9zm0 9l8-4.5M12 12v9m0-9L4 7.5m12-2.25l-8 4.5"
                  />
                </svg>
                Selecciona un tamaño:
              </label>
              <div
                role="group"
                aria-labelledby="size"
                className="flex flex-col lg:flex-row"
              >
                <div className="flex flex-col md:flex-row md:justify-between">
                <label
                  htmlFor="size-sobre"
                  className="flex items-center space-x-2 mb-2 md:mb-0 ml-5"
                  >
                  <Field
                    type="radio"
                    id="size-sobre"
                    name="size"
                    value="envelop"
                  />
                  <div className="flex  flex-col items-center space-x-2">
                    <span className="ml-2 mr-6 ">Sobre</span>
                    <span className="text-sm md:ml-0 text-primary">
                      Máximo formato A4{" "}
                    </span>
                  </div>
                </label>
                <label
                  htmlFor="size-pequeño"
                  className="flex items-center space-x-2 mb-2 md:mb-0 ml-5"
                  >
                  <Field
                    type="radio"
                    id="size-pequeño"
                    name="size"
                    value="small"
                  />
                  <div className="flex  flex-col items-center space-x-2">
                    <span className="ml-2 mr-6 ">Pequeño</span>
                    <span className="text-sm md:ml-0 text-primary">
                      Máximo de 150cm / 10000 grs
                    </span>
                  </div>
                </label>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:w-full">
                <label
                  htmlFor="size-mediano"
                  className="flex items-center space-x-2 mb-2 md:mb-0 ml-5"
                >
                  <Field
                    type="radio"
                    id="size-mediano"
                    name="size"
                    value="medium"
                  />
                  <div className="flex  flex-col items-center space-x-2">
                    <span className="ml-2 mr-6 ">Mediano</span>
                    <span className="text-sm md:ml-0 text-primary">
                      Máximo de 300cm / 25000 grs
                    </span>
                  </div>
                </label>
                <label
                  htmlFor="size-grande"
                  className="flex items-center space-x-2 mb-2 md:mb-0 ml-5"
                >
                  <Field
                    type="radio"
                    id="size-grande"
                    name="size"
                    value="large"
                  />
                  <div className="flex  flex-col items-center space-x-2">
                    <span className="ml-2 mr-6 ">Grande</span>
                    <span className="text-sm md:ml-0 text-primary">
                      Máximo de 495cm / 50000 grs
                    </span>
                  </div>
                </label>
              </div>
              </div>
            </div>
            <div className="mt-10 mb-5 flex justify-center items-center flex-col">
              <Button type="submit">COTIZAR</Button>
              <span className="text-sm mt-2 text-center">
                {" "}
                Contactate con nosotros para mas información aqui:{" "}
                <a
                  href="https://wa.me/5492634766992"
                  className="text-primary font-bold"
                >
                  Expreso Rivadavia
                </a>
              </span>
            </div>
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className=" p-4">
              {modalData && (
                <div className="flex flex-col gap-6">
                  <h1 className="text-xl text-center font-bold text-primary">
                    Detalles del envío
                  </h1>
                  <div className="flex justify-between gap-24">
                    <p className="text-center">
                      <strong>Ciudad de origen:</strong>
                      <br />
                      {
                        localities.find(
                          (loc) => Number(loc.id) === modalData.locality_origin
                        )?.name
                      }
                    </p>
                    <p className="text-center">
                      <strong>Ciudad de destino:</strong>
                      <br />
                      {
                        localities.find(
                          (loc) =>
                            Number(loc.id) === modalData.locality_destination
                        )?.name
                      }
                    </p>
                  </div>
                  <div className="flex gap-24 justify-between items-center">
                    <p className="m-auto text-center">
                      <strong>Tamaño:</strong>
                      <br /> {modalData.size}
                    </p>
                    <p className="text-center m-auto">
                      <strong>Precio:</strong>
                      <br />
                      {`${modalData.price} AR$`}
                    </p>
                  </div>

                  <div className=" flex justify-center items-center ">
                    <div
                      onClick={() => setOpen(false)}
                      className="text-base p-1 flex justify-start gap-1 hover:cursor-pointer text-primary bg-transparent items-center w-fit"
                    >
                      Cerrar Cotización
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        </Form>
      </Formik>
    </div>
  );
}
