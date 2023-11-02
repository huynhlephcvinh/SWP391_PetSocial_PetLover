import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, Navigate, json } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


import { Avatar, Button, Fade, Menu, MenuItem } from "@mui/material";
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  // const { currentUser } = useContext(AuthContext);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  // const currentUser=JSON.parse(localStorage.getItem('currentUser'))
  // console.log(currentUser.avatar);
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }} className="custom-link">
          <span>Dog Cat</span>
        </Link>
        <Link to='/' className="custom-link">
          <HomeOutlinedIcon />
        </Link>

        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}

        {currentUser.role === "ROLE_STAFF" ? (
          <CheckCircleOutlineIcon />
        ) : (
          null)}
        {/* <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div> */}
      </div>
      <div className="right">
        {/* <Link to='/profile/${currentUser.id}' className="custom-link"> */}
        <Link to='/my-profile' className="custom-link">
          <PersonOutlinedIcon />
        </Link >
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        {/* <Link to ='/profile/${currentUser.id}' className="custom-link">
        <div className="user">
          <img
            src={currentUser.avatar}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
        </Link> */}
        <Button
          style={{ textTransform: 'none', textDecoration: 'none' }}
          onClick={handleClick}
        >
          <span style={{ textTransform: 'none' }}>{currentUser.name}</span>
          <Avatar
            className={currentUser.profilePic}
            src={currentUser.avatar}
            style={{
              marginLeft: "10px",
            }}
          />
        </Button>


        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            component={Link}
            to={`/my-profile`}
            onClick={handleClose}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>









      </div>
    </div>
  );
};

export default Navbar;
