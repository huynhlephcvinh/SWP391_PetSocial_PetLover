import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
// import Waiting from "./pages/waiting/Waiting";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import MyProfile from "./pages/myprofile/MyProfile";
import MyPets from "./pages/MyPets/MyPets";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import Admin from "./Admin";
import User from "./User";

import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

function App() {
  
  const {currentUser} = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);
  // if(crUser==null){
  //   return <Navigate to ="/login"/> ;
  // };
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" />;
    }
    const crUser = JSON.parse(localStorage.getItem("currentUser"));
    if(crUser.role==="ROLE_ADMIN"){
      return <Navigate to="/admin" />;
    }

    return children;
  };

  <Route path="/profile/:userID" component={Profile}/>

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        
        { 
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:userID",
          element: <Profile />,
        },
        {
          path: "/my-profile",
          element: <MyProfile />,
        },
        {
          path:"/my-pets",
          element: <MyPets/>,
        },
        {
          path:"/market-place",
          element:<MarketPlace/>,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path:"/admin/*",
      element:<Admin/>,
    },
   
    // {
    //   path:"/waiting",
    //   element:<Waiting/>
    // },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
