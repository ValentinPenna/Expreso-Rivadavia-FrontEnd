import type { IShipment, IShipmentErrors } from "../types/typesRegister";


  export const validateShipment = (values: IShipment): IShipmentErrors => {
    const error: IShipmentErrors = {};
    
    if (!values.address_origin) {
      error.address_origin = "Por favor ingrese una dirección";
    } 
    if(!values.address_destination) { 
        error.address_destination = "Por favor ingrese una dirección";
    } 

    return error;
}