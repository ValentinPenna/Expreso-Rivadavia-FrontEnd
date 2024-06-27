import {create} from "zustand";
import type { User } from "../types/user";

const userMock: User = {
    id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    email: "user@example.com",
        name: "Pedro",
        lastName: "Gomez",
        companyName: "Gucci",
        dni: "12345678",
        cuit_cuil: "20304050607",
        address: "string",
        locality: "string",
        role: "user",
        orders: [
            {
                id: "string",
                user: {
                  id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
                  email: "user@example.com",
                  name: "Pedro",
                  lastName: "Gomez",
                  companyName: "Gucci",
                  dni: "12345678",
                  cuit_cuil: "20304050607",
                  address: "string",
                  locality: "string",
                  role: "user",
                  orders: [
                    
                  ],
                },
                shipments: {
                  id: "706becbe-9521-43be-a8ab-1938210ad078",
                  orders: "string",
                  locality_origin: "Rivadavia",
                  locality_destination: "San Martín",
                  address_origin: "string",
                  address_destination: "string",
                  shipment_price: 4000
                },
                packages: [
                  "string"
                ],
                receipt: {
                  id: "string",
                  user: "string",
                  orders: "string",
                  link: "string"
                },
                date: "2024-06-27T22:30:46.427Z",
                final_price: 0,
                status: "Entregada"
              },
              {
                id: "string",
                user: {
                  id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
                  email: "user@example.com",
                  name: "Pedro",
                  lastName: "Gomez",
                  companyName: "Gucci",
                  dni: "12345678",
                  cuit_cuil: "20304050607",
                  address: "string",
                  locality: "string",
                  role: "user",
                  orders: [
                    
                  ],
                },
                shipments: {
                  id: "706becbe-9521-43be-a8ab-1938210ad078",
                  orders: "string",
                  locality_origin: "Rivadavia",
                  locality_destination: "San Martín",
                  address_origin: "string",
                  address_destination: "string",
                  shipment_price: 4000
                },
                packages: [
                  "string"
                ],
                receipt: {
                  id: "string",
                  user: "string",
                  orders: "string",
                  link: "string"
                },
                date: "2024-06-27T22:30:46.427Z",
                final_price: 0,
                status: "Entregada"
              }
        ]
}

interface State {
    user: User | null;
    token: string;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    removeSession: () => void;
}

export const useUserStore = create<State>((set, get) => ({
    user: userMock,
    token: "",
    setUser: (user: User) => set({ user }),
    setToken: (token: string) => set({ token }),
    removeSession: () => set({ user: null, token: "" }),
}))