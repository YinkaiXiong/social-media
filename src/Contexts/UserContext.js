import { useState, createContext } from "react";

const UserContext = createContext();
/* const UserUpdateContext = react.createContext(); */

/* const useUser = () => {
  return useContext(UserContext);
};

const useUserUpdate = () => {
  return useContext(UserUpdateContext);
};
 */
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
