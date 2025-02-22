import { createContext, useState, useEffect } from "react";

const initialValue = {
  user: null,
  addUser: () => {},
  removeUser: () => {},
};

export const userContext = createContext(initialValue);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const addUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user data
  };

  return (
    <userContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </userContext.Provider>
  );
};
