import { createContext, useState } from "react";

const initialValue = {
  user: null,
  addUser: () => {},
};

export const userContext = createContext(initialValue);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const addUser = (userData) => {
    setUser(userData);
  };

  // console.log("Current User:", user);

  return (
    <userContext.Provider value={{ user, addUser }}>
      {children}
    </userContext.Provider>
  );
};
