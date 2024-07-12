import { create } from "zustand";
import type {
  ChangePassProps,
  Company,
  CompanyRegister,
  LoginResponse,
  RegisterResponse,
  User,
  UserChangeData,
  UserLogin,
  UserRegister,
} from "../types/user";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.PUBLIC_API_URL;

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
  uploadImage: (file: File, id: string) => Promise<string>;
  googleLogin: (email: string | null) => Promise<LoginResponse | void>;
  changeUserData: (dataUser: UserChangeData, id: string) => Promise<void>;
  getUsers: () => Promise<User[]>;
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
          Authorization: `Bearer ${
            localStorage.getItem("token") || get().token
          }`,
        },
      });
      const data = await response.json();
      // console.log(data);
      if (Object.keys(data).includes("id")) {
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        throw new Error("No se pudo obtener el usuario");
      }
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

  uploadImage: async (file: File, id: string): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${apiUrl}/files/uploadImage/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("token") || get().token
          }`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }
      const responseData = await response.json();
      if (!responseData.profilePicture) {
        throw new Error("No se devolvió la URL de la imagen");
      }
      //* en vez de guardar el nuevo item sacar el viejo reemplazar el valor y volverlo a guardar
      // 1 sacar el user de local storage
      const oldUser: User = JSON.parse(localStorage.getItem("user")!);
      // 2 modificar el user con el nuevo valor de la foto
      const updatedUser = {
        ...oldUser,
        profilePicture: responseData.profilePicture,
      };
      //3 volver a guardar el user modificado en el local
      localStorage.setItem("user", JSON.stringify(updatedUser));

      set((state) => ({
        user: {
          ...state.user,
          profilePicture: responseData.profilePicture,
        },
      }));
      return responseData.profilePicture;
    } catch (error) {
      console.error(error);
      throw new Error("Error uploading profile picture");
    }
  },

  googleLogin: async (emailUser: string | null) => {
    try {
      // console.log(emailUser);
      const email = {
        email: emailUser,
      };
      let bodyContent = JSON.stringify(email);
      // console.log(bodyContent);

      const response = await fetch(`${apiUrl}/auth/google/signin`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: bodyContent,
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(`text`, error);
    }
  },
  changeUserData: async (userData, userId) => {
    try {
      let bodyContent = JSON.stringify(userData);

      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: `PUT`,
        headers: {
          "Content-Type": `application/json`,
          authorization: `Bearer ${
            localStorage.getItem("token") || get().token
          } `,
        },
        body: bodyContent,
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(`text`, error);
    }
  },
  getUsers: async () => {
    try {
      const response = await fetch(`${apiUrl}/users/?page=1&limit=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
}));
