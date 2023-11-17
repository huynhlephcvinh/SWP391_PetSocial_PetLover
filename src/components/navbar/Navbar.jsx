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
import axios from "axios";
import CD from "../../assets/CD.png";

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
    localStorage.clear();
    navigate("/login");
  };

  // const handleChatClick = () => {
  //   // Navigate to the chat route
  //   // navigate("/chat");
  // };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem("token");

  const [messageOpen, setMessageOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleToggleMessage = () => {
    navigate("/chat"); // Close the notification dropdown
  };

  const handleToggleNotification = () => {
    setNotificationCount(notificationCount + 1); // Increment the count
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
          {/* Display notifications */}
          {notificationCount > 0 ? (
            <div className="notification-count">{notificationCount}</div>
          ) : null}
          {/* Your notification items go here */}
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

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    if (searchTerm) {
      // Redirect to the search results page
      navigate(`/search?content=${searchTerm}`);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src={CD}
            alt="Dog Cat"
            style={{
              maxWidth: "60px",
              width: "100%",
              borderRadius: "50%",
              marginTop: "5px",
            }}
          />
          {/* <span>Dog Cat</span> */}
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        {currentUser.role === "ROLE_STAFF" ? (
          <Link to="/staff">
            {" "}
            <CheckCircleOutlineIcon />
          </Link>
        ) : null}
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <SearchOutlinedIcon onClick={handleSearchClick} />
        </div>
        {/* ... Other components ... */}

        {/* Display search results */}
        <div className="search-results">
          {searchResults.map((post) => (
            <div key={post.id}>{/* Display search result information */}</div>
          ))}
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <MessageIcon onClick={handleToggleMessage} />
        {/* {messageOpen && <MessageDropdown />} */}

        <NotificationsOutlinedIcon onClick={handleToggleNotification} />

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
          <MenuItem component={Link} to={`/payment`}>
            Payment
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
