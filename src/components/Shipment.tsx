import { Field, Form, Formik, type FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import Button from "./secondary/Button";
import { Input } from "./secondary/Input";
import { validateShipment } from "./validation/validateShipment";
import { auth } from "../helpers/auth";
import { useOrdersStore } from "../store/ordersStore";
import { useUserStore } from "../store/userStore";
import type { ICreateOrderModalProps, ILocality } from "../types/shipments";
import Modal from "./secondary/Modal";
import { BiTrash } from "react-icons/bi";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.PUBLIC_API_URL;
const CLIENTID = import.meta.env.PUBLIC_APP_PAYPAL_CLIENT_ID;

const Shipment = () => {
  const user = useUserStore((state) => state.user);
  const [localities, setLocalities] = useState<ILocality[]>([]);
  const createOrder = useOrdersStore((state) => state.createOrder);
  const getLocalities = useOrdersStore((state) => state.getLocalities);
  const token: string = useUserStore((state) => state.token);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<ICreateOrderModalProps | null>(
    null
  );
  const quotation = useOrdersStore((state) => state.quotation);
  const [dataPayment , setDataPayment] = useState(null)
  useEffect(() => {
    // const isAuth: boolean = auth();
    // if (!isAuth) {
    //   window.location.href = "/auth/register";
    // }
    async function fetchLocalities() {
      const data = await getLocalities();
      setLocalities(data);
    }
    fetchLocalities();
  }, []);
  useEffect(() => {
    if (dataPayment) {
      handlePaymentSuccess();
    }
  }, [dataPayment]);

  const handlePaymentSuccess = async () => {
    try {
      if (modalData?.size === "Sobre") modalData.size = "envelop";
      if (modalData?.size === "Pequeño") modalData.size = "small";
      if (modalData?.size === "Mediano") modalData.size = "medium";
      if (modalData?.size === "Grande") modalData.size = "large";
      console.log(dataPayment);
      
      await createOrder({
        size: modalData?.size || "",
        locality_origin: modalData?.locality_origin || 0,
        locality_destination: modalData?.locality_destination || 0,
        address_origin: modalData?.address_origin || "",
        address_destination: modalData?.address_destination || "",
      },dataPayment);
      toast.success("El pago ha sido exitoso");
      setOpen(false);
      setTimeout(() => {
        window.location.href = "/dashboard/shipments";
      }, 3000);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  const handleCancel = () =>{
    setOpen(false)
    setModalData(null)
  }

  const initialOptions = {
    clientId: CLIENTID,
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="px-4 md:px-8 z-50">
        <Formik
          initialValues={{
            locality_origin: "0",
            locality_destination: "0",
            size: "",
            address_origin: user?.address,
            address_destination: "",
          }}
          validate={validateShipment}
          onSubmit={(values, { resetForm }) => {
            quotation({
              size: values.size,
              locality_origin: Number(values.locality_origin),
              locality_destination: Number(values.locality_destination),
            }).then((data: any) => {
              if (values.size === "envelop") values.size = "Sobre";
              if (values.size === "small") values.size = "Pequeño";
              if (values.size === "medium") values.size = "Mediano";
              if (values.size === "large") values.size = "Grande";
              setModalData({
                size: values.size,
                locality_origin: Number(values.locality_origin),
                locality_destination: Number(values.locality_destination),
                address_origin: values.address_origin,
                address_destination: values.address_destination,
                price: data,
              });
              setOpen(true);
            }).catch((err)=>{
              toast.error("Recuerda rellenar todos los campos")
              setOpen(false)
            });
          }}
        >
          {({ errors }) => (
            <Form className="max-w-4xl mx-auto bg-white p-4 my-4 rounded-lg shadow-lg">
              <div>
                <h1 className="text-primary font-bold lg:text-5xl md:text-4xl text-2xl text-center">
                  Realizar envío
                </h1>
              </div>
              <div className="text-xl sm:text-2xl m-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <label
                      htmlFor="locality_origin"
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
                      id="locality_origin"
                      name="locality_origin"
                      className="p-1 focus:border focus:rounded-lg focus:outline-none focus:border-primary hover:border-primary w-56"
                    >
                      <option value={0}>Seleccionar</option>
                      {localities?.map((locality) => (
                        <option key={locality.id} value={locality.id}>
                          {locality.name}
                        </option>
                      ))}
                    </Field>
                    <Input
                      label="Dirección de origen"
                      name="address_origin"
                      placeholder="calle 123"
                      error={errors.address_origin}
                    ></Input>
                  </div>
                  <div>
                    <label
                      htmlFor="locality_destination"
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
                      id="locality_destination"
                      name="locality_destination"
                      className="p-1 focus:border focus:rounded-lg focus:outline-none focus:border-primary hover:border-primary w-56"
                    >
                      <option value={0}>Seleccionar</option>
                      {localities?.map((locality) => (
                        <option key={locality.id} value={locality.id}>
                          {locality.name}
                        </option>
                      ))}
                    </Field>
                    <Input
                      label="Dirección de destino"
                      name="address_destination"
                      placeholder="calle 123"
                      error={errors.address_destination}
                    ></Input>
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
                    className="flex flex-col md:flex-row"
                  >
                  <div className="flex flex-col sm:flex-row">
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
                        <span className="ml-2 mr-6 text-2xl">Sobre</span>
                        <span className="text-sm md:ml-0 font-quicksand text-black">
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
                          <span className="ml-2 mr-6 text-2xl">Pequeño</span>
                          <span className="text-sm md:ml-0 font-quicksand text-black">
                            Máximo de 150cm / 10000 grs
                          </span>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-col sm:flex-row">
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
                          <span className="ml-2 mr-6 text-2xl">Mediano</span>
                          <span className="text-sm md:ml-0 font-quicksand text-black">
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
                          <span className="ml-2 mr-6 text-2xl">Grande</span>
                          <span className="text-sm md:ml-0 font-quicksand text-black">
                            Máximo de 495cm / 50000 grs
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                {!token ? (
                  <div className="mt-10 mb-5 flex justify-center flex-col items-center">
                    <Button disabled={!token}>CREAR ENVIO</Button>
                    <span className="text-sm text-center mt-2">
                      Debes iniciar sesión para poder realizar un envío
                    </span>
                  </div>
                ) : (
                  <div className="mt-10 mb-5 flex justify-center flex-col items-center">
                    <Button type="submit">CREAR ENVIO</Button>
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
                )}
              </div>
              <Modal open={open} onClose={() => setOpen(false)}>
                <div className="w-[500px] max-h-[600px] p-4 overflow-y-auto">
                  {modalData && (
                    <div>
                      <h1 className="text-xl font-bold mb-4 text-primary">
                        Detalles del envío
                      </h1>
                      <p>
                        <strong>Ciudad de origen:</strong>{" "}
                        {
                          localities.find(
                            (loc) =>
                              Number(loc.id) === modalData.locality_origin
                          )?.name
                        }
                      </p>
                      <p>
                        <strong>Ciudad de destino:</strong>{" "}
                        {
                          localities.find(
                            (loc) =>
                              Number(loc.id) === modalData.locality_destination
                          )?.name
                        }
                      </p>
                      <p>
                        <strong>Tamaño:</strong> {modalData.size}
                      </p>
                      <p>
                        <strong>Dirección de origen:</strong>{" "}
                        {modalData.address_origin}
                      </p>
                      <p>
                        <strong>Dirección de destino:</strong>{" "}
                        {modalData.address_destination}
                      </p>
                      <p>
                        <strong>Precio:</strong>{" "}
                        {`${modalData.price} pesos argentinos`}
                      </p>
                      <div className=" flex justify-center items-center gap-24 mt-8">
                        <div
                          onClick={() => handleCancel()}
                          className="text-xs p-1 flex justify-start gap-1 hover:cursor-pointer text-primary bg-transparent items-center w-fit"
                        >
                          Cancelar Envio
                          <BiTrash />
                        </div>
                        <div className="relative flex flex-col gap-1 items-center text-primary text-xs font-bold">
                          <span className="absolute z-[99999] -top-5">
                            Metodo de pago
                          </span>
                          <PayPalButtons
                            style={{
                              shape: "rect",
                              color: "blue",
                              layout: "horizontal",
                            }}
                            createOrder={async (data, actions) => {
                              console.log(modalData.price);
                              
                              let newPrice: number | string = Number(modalData.price) / 1420
                              newPrice = newPrice.toFixed(1)
                              console.log(newPrice);
                              
                              const response = await fetch(
                                `${apiUrl}/paypal/create-order`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                  },
                                  body: JSON.stringify({
                                    amount: newPrice,
                                  }),
                                }
                              );
                              const orderData = await response.json();
                              return orderData.orderId;
                            }}
                            onApprove={async (data, actions) => {
                              
                              const response = await fetch(
                                `${apiUrl}/paypal/capture-order/`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                  },
                                  body: JSON.stringify({
                                    orderId: data.orderID,
                                  }),
                                }
                              );
                              const orderData = await response.json();
                              console.log(orderData);
                            
                              setDataPayment(orderData)

                              // await handlePaymentSuccess();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Modal>
            </Form>
          )}
        </Formik>
      </div>
    </PayPalScriptProvider>
  );
};

export default Shipment;
