import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

<<<<<<< HEAD
  const LoginAuth = (username, password) => {
    const response = axios.post("http://103.253.147.216:8080/signin", {
      email: username,
      password: password,
=======
  const LoginAuth = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/signin", {
        email: email,
        password: password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      return response;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response1 = await axios.get(
            "http://localhost:8080/user/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // localStorage.setItem('currentUser', JSON.stringify(response1.data));
          setCurrentUser(response1.data.data);
          console.log(">>> Current: " + response1.data.data.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []); // không có dependency

  // Thêm một hàm để đăng xuất người dùng bằng cách xóa token và currentUser khỏi localStorage và state
  const LogoutAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, LoginAuth, LogoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
