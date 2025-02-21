import { createContext, useState } from "react";

const intiailValue = {
  isLoading: false,
  setLoading: (value) => {},
};

export const loadingContext = createContext(intiailValue);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (value) => {
    setIsLoading(value);
  };

  return (
    <loadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </loadingContext.Provider>
  );
};
