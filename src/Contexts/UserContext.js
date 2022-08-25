import { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const addCurrentUser = (currentUser) => {
    setUser(currentUser);
  };

  return (
    <UserContext.Provider value={{ user, addCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
