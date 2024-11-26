import { atom } from "recoil";

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  // Since the token is likely a JWT, we do not need to parse it as JSON.
  return token ? token : null;
};

export const tokenAtom = atom({
  key: "tokenAtom",
  default: getTokenFromLocalStorage(),
});

export const userAtom = atom({
  key: "userAtom",
  default: {
    firstname: "",
    lastname: "",
  },
});