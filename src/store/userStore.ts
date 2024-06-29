import {create} from "zustand";
import type { CompanyRegister, LoginResponse, RegisterResponse, User, UserLogin, UserRegister } from "../types/user";
const apiUrl = import.meta.env.PUBLIC_API_URL

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
                id: "string1",
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
                date: "2024-06-30T22:30:46.427Z",
                final_price: 0,
                status: "delivered"
              },
              {
                id: "string2",
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
                status: "delivered"
              },
              {
                id: "string3",
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
                date: "2024-06-29T22:30:46.427Z",
                final_price: 0,
                status: "delivered"
              },
              {
                id: "string4",
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
                date: "2024-06-29T22:30:46.427Z",
                final_price: 0,
                status: "sending"
              },
              {
                id: "string5",
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
                date: "2024-06-25T22:30:46.427Z",
                final_price: 0,
                status: "sending"
              }
        ]
}

interface State {
    user: User;
    token: string;
    setUser: () => void;
    setToken: () => void;
    removeSession: () => void;
    getUser: (id: string) => Promise<void>;
    loginUser: (user: UserLogin) => Promise<LoginResponse | void>;
    userRegister: (user: UserRegister | CompanyRegister) => Promise<RegisterResponse>;
}

export const useUserStore = create<State>((set, get) => ({
    user: userMock,
    token: "",
    setUser: () => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user")!);
      set({ user: userLocalStorage });
    },
    setToken: () => {
      const tokenLocalStorage = localStorage.getItem("token")!;
      set({ token: tokenLocalStorage });
    },
    getUser: async (id: string) => {
      try {
        const response = await fetch(`${apiUrl}/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token") || get().token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        // set({ user: data });
      } catch (error) {
        console.log(error);
      }
    },
    loginUser: async (user: UserLogin): Promise<LoginResponse | void> => {
      try {
        const response = await fetch(`${apiUrl}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data: LoginResponse = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            return data;
        }
      } catch (error) {
        console.log(error);
      }
        
    },
    userRegister: async (user: UserRegister | CompanyRegister) => {
      try {
        console.log(user);
        const response = await fetch(`${apiUrl}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
        
    },
    removeSession: () => {
      // set({ user: null, token: "" })
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
}))