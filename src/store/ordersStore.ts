import { create } from "zustand";
import type { ICreateOrderProps, ILocality, IordersQuotationsProps, Orders } from "../types/shipments";
import { useEffect } from "react";

const apiUrl = import.meta.env.PUBLIC_API_URL;

interface State {
    quotation: ({size, locality_origin, locality_destination}:IordersQuotationsProps) => Promise<number>
    getLocalities: () => Promise<ILocality[]>
    createOrder: ({size, locality_origin, locality_destination, address_origin, address_destination}:ICreateOrderProps) => Promise<Orders>
}

export const useOrdersStore = create<State>((set, get) => ({
    quotation: async ({size, locality_origin, locality_destination}:IordersQuotationsProps) => {
    try {
        const response = await fetch(`${apiUrl}/orders/quoter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                "packages": {
                    "size": size
                },
                "shipment": {
                    "locality_origin": {
                        "id": locality_origin
                    },
                    "locality_destination": {
                        "id": locality_destination
                    }
                }
            })
        })

        const data = await response.json();
        return data;

        } catch (error) {
            console.log(error);
        }
    },
    getLocalities: async () => {
        try {
            const response = await fetch(`${apiUrl}/localities`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    createOrder: async ({size, locality_origin, locality_destination, address_origin, address_destination}:ICreateOrderProps) => {
        const userId = JSON.parse(localStorage.getItem("user")!).id;
        try {
            const response = await fetch(`${apiUrl}/orders/new/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    "packages": {
                      "size": size
                    },
                    "shipment": {
                      "locality_origin": {
                        "id": locality_origin
                      },
                      "locality_destination": {
                        "id": locality_destination
                      },
                      "address_origin": address_origin,
                      "address_destination": address_destination
                    }
                  })
            })
    
            const data = await response.json();
            return data;
    
            } catch (error) {
                console.log(error);
            }
        },
}))