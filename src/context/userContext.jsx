import { createContext } from "react";

const intiailValue = {};

export const userContext = createContext(intiailValue);

export const UserProvider = ({ children }) => {
  const [name, setName] = useState();

  return (
    <userContext.Provider value={{ name, setName }}>
      {children}
    </userContext.Provider>
  );
};
