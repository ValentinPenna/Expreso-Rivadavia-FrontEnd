import { create } from "zustand";
import type {
  ChangePassProps,
  Company,
  CompanyRegister,
  LoginResponse,
  RegisterResponse,
  User,
  UserLogin,
  UserRegister,
} from "../types/user";
import type { Orders } from "../types/shipments";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.PUBLIC_API_URL;

const userMock: User = {
  id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
  email: "user@example.com",
  name: "Pedro",
  lastName: "Gomez",
  companyName: "Gucci",
  dni: "",
  cuit_cuil: "20304050607",
  address: "string",
  locality: "string",
  role: "user",
  orders: [],
  profilePicture: "",
};

// const ordersMock: Orders[] = [
//   {
//     id: "order1",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-30T22:30:46.427Z",
//     final_price: 10000,
//     status: "delivered",
//   },
//   {
//     id: "order2",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-27T22:30:46.427Z",
//     final_price: 16000,
//     status: "delivered",
//   },
//   {
//     id: "order3",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-29T22:30:46.427Z",
//     final_price: 25000,
//     status: "delivered",
//   },
//   {
//     id: "order4",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-29T22:30:46.427Z",
//     final_price: 11000,
//     status: "sending",
//   },
//   {
//     id: "order5",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-25T22:30:46.427Z",
//     final_price: 19000,
//     status: "sending",
//   },
//   {
//     id: "order6",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-17T22:30:46.427Z",
//     final_price: 15000,
//     status: "acepted",
//   },
//   {
//     id: "order7",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-10T22:30:46.427Z",
//     final_price: 20000,
//     status: "cancelled",
//   },
//   {
//     id: "order8",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-10T22:30:46.427Z",
//     final_price: 12000,
//     status: "delivered",
//   },
//   {
//     id: "order9",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-30T22:30:46.427Z",
//     final_price: 7000,
//     status: "receipted",
//   },
//   {
//     id: "order10",
//     user: {
//       id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
//       email: "user@example.com",
//       name: "Pedro",
//       lastName: "Gomez",
//       companyName: "Gucci",
//       dni: "12345678",
//       cuit_cuil: "20304050607",
//       address: "string",
//       locality: "string",
//       role: "user",
//       orders: [],
//       profilePicture: "",
//     },
//     shipments: {
//       id: "706becbe-9521-43be-a8ab-1938210ad078",
//       orders: "string",
//       locality_origin: "Rivadavia",
//       locality_destination: "San Martín",
//       address_origin: "string",
//       address_destination: "string",
//       shipment_price: 4000,
//     },
//     packages: ["string"],
//     receipt: {
//       id: "string",
//       user: "string",
//       orders: "string",
//       link: "string",
//     },
//     date: "2024-06-25T22:30:46.427Z",
//     final_price: 8000,
//     status: "delivered",
//    },
// ];

const initialUser: User = {
  id: "",
  email: "",
  name: "",
  lastName: "",
  companyName: "",
  dni: "",
  cuit_cuil: "",
  address: "",
  locality: "",
  role: "",
  orders: [],
  profilePicture: "",
};

interface State {
  user: User;
  token: string;
  setUser: () => void;
  setToken: () => void;
  removeSession: () => void;
  getUser: (id: string) => Promise<void>;
  loginUser: (user: UserLogin) => Promise<LoginResponse | void>;
  userRegister: (
    user: UserRegister | CompanyRegister
  ) => Promise<RegisterResponse | void>;
  // setOrders: () => void;
  changePassword: (dataUser: ChangePassProps, id: string) => Promise<User>;
}

export const useUserStore = create<State>((set, get) => ({
  user: initialUser,
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
          "Authorization": `Bearer ${
            localStorage.getItem("token") || get().token
          }`,
        },
      });
      const data = await response.json();
      // console.log(data);
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
  userRegister: async (
    user: UserRegister | CompanyRegister
  ): Promise<RegisterResponse | void> => {
    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(`Error al registrar usuario: ${error.message}`);
        return Promise.reject(`Error al registrar usuario: ${error.message}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Error al comunicarse con el servidor");
      return Promise.reject("Error al comunicarse con el servidor");
    }
  },
  removeSession: () => {
    set({ user: initialUser, token: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  // setOrders: () => {
  //   set({ user: { ...get().user, orders: ordersMock } });
  // },
  changePassword: async (dataUser: ChangePassProps, id: string) => {
    try {
      let bodyContent = JSON.stringify(dataUser);

      const response = await fetch(`${apiUrl}/users/changepassword/${id}`, {
        method: `PUT`,
        headers: {
          "Content-Type": `application/json`,
          authorization: `Bearer ${
            localStorage.getItem("token") || get().token
          } `,
        },
        body: bodyContent,
      });
      if (!response.ok) {
        let errorText = response.statusText;

        throw new Error(`${errorText}!`);
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  },
}));
