import {create} from "zustand";
import type { User } from "../types/user";

const userMock: User = {
    name: "Valentin",
    lastName: "Perez",
    email: "o5H2G@example.com",
    dni: "12345678",
    address: "Calle 123",
    locality: "CABA",
    role: "user",
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