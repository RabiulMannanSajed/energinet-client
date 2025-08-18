import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  console.log(userEmail);
  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email);
  }, []);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
