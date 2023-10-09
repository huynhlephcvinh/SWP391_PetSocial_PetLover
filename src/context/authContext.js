import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );

  useEffect(() => {
    // Lấy giá trị từ localStorage
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    // Cập nhật state currentUser nếu có giá trị từ localStorage
    if (storedUser) {
      setCurrentUser(storedUser);
    }

  }, []); // Dependency array rỗng đảm bảo useEffect chỉ chạy một lần khi component mount

  console.log("tao la currentU" + (currentUser ? currentUser.name : "null"));

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
