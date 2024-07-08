import type { User } from "./user";

export interface Orders {
  id: string;
  user: User;
  shipments: Shipments;
  packages: string[];
  receipt: {
    id: string;
    user: string;
    orders: string;
    link: string;
  };
  date: string;
  final_price: number;
  status: string;
}

export interface IHistoryShipmentProps {
  orders: Orders[];
}

export interface Shipments {
  id: string;
  orders: string;
  locality_origin: {
    id: number;
    name: string;
  };
  locality_destination: {
    id: number;
    name: string;
  };
  address_origin: string;
  address_destination: string;
  shipment_price: number;
}

export interface Packages {
  id: string;
  size: string;
  package_price: number;
  orders: Orders;
}

// export enum Status {
//     "receipted" = "RECIBIDO",
//     "acepted" = "ACEPTADO",
//     "sending" = "EN CAMINO",
//     "delivered" = "ENTREGADO",
//     "cancelled" = "CANCELADO",
// }

export type Status = {
  [key: string]: string;
  receipted: "RECIBIDO";
  acepted: "ACEPTADO";
  sending: "EN CAMINO";
  delivered: "ENTREGADO";
  cancelled: "CANCELADO";
};

export const statusMap: { [key: string]: string } = {
  receipted: "RECIBIDO",
  acepted: "ACEPTADO",
  sending: "EN CAMINO",
  delivered: "ENTREGADO",
  cancelled: "CANCELADO",
};

export interface IordersQuotationsProps {
  size: string;
  locality_origin: number;
  locality_destination: number;
}

export interface ILocality {
  id: string;
  name: string;
}

export interface ICreateOrderProps {
  size: string;
  locality_origin: number;
  locality_destination: number;
  address_origin: string;
  address_destination: string;
}

export interface ICreateOrderModalProps {
  size: string;
  locality_origin: number;
  locality_destination: number;
  address_origin: string;
  address_destination: string;
  price: string;
}
