import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { Avatar, Button, Fade, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MessageIcon from "@mui/icons-material/Message";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  // const handleChatClick = () => {
  //   // Navigate to the chat route
  //   // navigate("/chat");
  // };

  const [messageOpen, setMessageOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleToggleMessage = () => {
    setMessageOpen(!messageOpen);
    setNotificationOpen(false); // Close the notification dropdown
  };

  const handleToggleNotification = () => {
    setNotificationOpen(!notificationOpen);
    setMessageOpen(false); // Close the message dropdown
  };

  const MessageDropdown = () => {
    // const [messages, setMessages] = useState([]);
    return (
      <div className={`message-dropdown ${messageOpen ? "open" : ""}`}>
        <div className="dropdown-content">
          <div className="message-item">
            <Avatar className="message-img" src={currentUser.avatar} />
            <div className="message-details">
              <div className="message-name">{currentUser.name}</div>
              <div className="message-text">{currentUser.name}</div>
            </div>
          </div>
          <div className="message-item">
            <Avatar className="message-img" src={currentUser.avatar} />
            <div className="message-details">
              <div className="message-name">{currentUser.name}</div>
              <div className="message-text">{currentUser.name}</div>
            </div>
          </div>
          <div className="message-item">
            <Avatar className="message-img" src={currentUser.avatar} />
            <div className="message-details">
              <div className="message-name">{currentUser.name}</div>
              <div className="message-text">{currentUser.name}</div>
            </div>
          </div>
          <div className="message-item">
            <Avatar className="message-img" src={currentUser.avatar} />
            <div className="message-details">
              <div className="message-name">{currentUser.name}</div>
              <div className="message-text">{currentUser.name}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotificationDropdown = () => {
    return (
      <div className={`notify-dropdown ${notificationOpen ? "open" : ""}`}>
        <div className="dropdown-content">
          <div className="notify-item">
            <Avatar className="notify-img" src={currentUser.avatar} />
            <div className="notify-details">
              <div className="notify-name">{currentUser.name}</div>
              <div className="notify-text">{currentUser.name}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Dog Cat</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        {currentUser.role === "ROLE_STAFF" ? (
<<<<<<< HEAD
          <CheckCircleOutlineIcon />
        ) : (
          null)}
        {/* <div className="search">
=======
          <Link to="/staff">
            {" "}
            <CheckCircleOutlineIcon />
          </Link>
        ) : null}
        <div className="search">
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <MessageIcon onClick={handleToggleMessage} />
        {messageOpen && <MessageDropdown />}

        <NotificationsOutlinedIcon onClick={handleToggleNotification} />
        {notificationOpen && <NotificationDropdown />}

        {/* <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<ArrowDropDownIcon />}
        >
          {currentUser.name}
          <Avatar
            className={currentUser.avatar}
            src={currentUser.avatar}
            style={{
              marginLeft: "10px",
            }}
          />
        </Button> */}
        {currentUser ? (
          <Button
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleClick}
            startIcon={<ArrowDropDownIcon />}
          >
            {currentUser.name}
            <Avatar
              className={currentUser.avatar}
              src={currentUser.avatar}
              style={{
                marginLeft: "10px",
              }}
            />
          </Button>
        ) : (
          <Button onClick={handleClick}>Log In</Button>
        )}

        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem component={Link} to={`/my-profile`} onClick={handleClose}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
