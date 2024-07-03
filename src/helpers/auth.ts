export const auth = (): boolean => {
  const token: string | null = localStorage.getItem("token");
  return token ? true : false;
};
