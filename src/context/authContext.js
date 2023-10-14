import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    // JSON.parse(localStorage.getItem("user")) || null        
    JSON.parse(localStorage.getItem('currentUser'))

  );

  // const login = () => {
  //   TO DO

  //     {
  //     id:1,
  //     name: "John",
  //     profilePic:
  //       "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   }
  //   );
  // };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

  }, [currentUser]);
  // console.log("tao la currentU" + currentUser.name);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
