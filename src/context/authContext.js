import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const login = async () => {
    const token = localStorage.getItem("token"); // Đảm bảo bạn đã lưu token vào localStorage khi đăng nhập

    if (!token) {
      console.error("Không có token xác thực.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data; // Lấy dữ liệu người dùng từ response
      console.log(userData);

      // Cập nhật thông tin người dùng trong state
      setCurrentUser({
        id: userData.id,
        name: userData.name,
        avatar: userData.avatar,
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      // Xử lý lỗi nếu cần
    }
  };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
