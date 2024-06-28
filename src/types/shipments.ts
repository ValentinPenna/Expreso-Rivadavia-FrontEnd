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
    locality_origin: string;
    locality_destination: string;
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