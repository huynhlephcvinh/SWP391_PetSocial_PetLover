import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    // JSON.parse(localStorage.getItem("user")) || null        
    JSON.parse(localStorage.getItem('currentUser'))

  );

  const LoginAuth = (username, password) => {
    const response = axios.post("http://localhost:8080/signin", {
      email: username,
      password: password,
    }
    );
    return response;
  };


// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token) {
//         const response1 = await axios.get('http://localhost:8080/user/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // localStorage.setItem('currentUser', JSON.stringify(response1.data));
//         setCurrentUser(response1.data.data);
//         console.log(">>> Current: " + response1.data.data.name);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   fetchUserData();
// }, []); // không có dependency

// useEffect để theo dõi thay đổi của currentUser


  return (
    <AuthContext.Provider value={{ currentUser, LoginAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
