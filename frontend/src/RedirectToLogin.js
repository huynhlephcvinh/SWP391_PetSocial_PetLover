import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Empty component, as it's only for side effect (redirect)
  return null;
};

export default RedirectToLogin;
