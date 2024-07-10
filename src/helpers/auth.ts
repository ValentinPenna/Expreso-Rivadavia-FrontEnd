import type { User } from "../types/user";

export const auth = (): boolean => {
  const token: string | null = localStorage.getItem("token");
  return token && token !== "undefined" ? true : false;
};

export const authTransport = (): boolean => {
  const userInfo = localStorage.getItem("user");

  if (!userInfo) {
    return false;
  }

  const user: User = JSON.parse(userInfo);

  return user.role === "transporte";
};

export const authAdmin = (): Boolean => {
  const userInfo = localStorage.getItem("user");
  if (!userInfo) {
    return false;
  }

  const user: User = JSON.parse(userInfo);
  return user.role === "admin";
};
