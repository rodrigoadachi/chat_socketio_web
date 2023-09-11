"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UserType } from "../types/User";

interface ContextProps {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}

const GlobalContext = createContext<ContextProps>({
  user: {
    id: "",
    name: "",
    email: "",
  },
  setUser: (): UserType => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState<{} | UserType>({});

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
