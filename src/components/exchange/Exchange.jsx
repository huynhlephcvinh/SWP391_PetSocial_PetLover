import "./exchange.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";


const Exchange = ({ exchange }) => {
  const currentDate = new Date();
  const upExchangeDate = new Date(exchange.exchangeDate);
  const timeDifference = currentDate - upExchangeDate;
  const [error, setError] = useState('');
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [menuAnchor, setMenuAnchor] = useState(null);
  const handleMenuClick = (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
    setMenuAnchor(event.currentTarget);
  };
  const token = localStorage.getItem('token');

  const handleApply = async () => {
    try {
      const apply = await axios.post('http://103.253.147.216:8080/apply/create', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userid: exchange.userDTO.id,
          id: exchange.id,
        }
      });

      console.log(apply.data);
    } catch (error) {
      console.error(error);
    }
  };


  const closeMessage = () => {
    setIsMessageOpen(false);
    // setExchanges(exchanges.filter(item => item.id !== exchange.id))
    setExchanges(exchanges.filter(item => item.id !== exchange.id))

  }

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const handleMenuDelete = () => {
    // const token = localStorage.getItem('token');
    // const response = axios.delete("http://localhost:8080/post/delete/"+post.id,{
    //   headers:{
    //     Authorization: `Bearer ${token}`,
    //   }
    // })
    // console.log(response);
    // if(response.data==="Not Found"){
    //   console.log("Delete deo duoc");
    //   //Lam cai message
    // }else{
    //   console.log("Delete duoc roi");
    //   //Lam message
    // }
    window.location.reload();

  }

  const handleMenuUpdate = () => {

  }

  let formattedDate;

  if (timeDifference < 60 * 1000) {
    formattedDate = `${Math.floor(timeDifference / 1000)} seconds ago`;
  } else if (timeDifference < 60 * 60 * 1000) {
    formattedDate = `${Math.floor(timeDifference / (60 * 1000))} minutes ago`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
    );
    formattedDate = `${hours} hours ago`;
  } else {
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    formattedDate = `${days} days ago`;
  }

  return (
    <div className="exchange">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <div className="avatar">
              <img className="avtuser" src={exchange.userDTO.avatar} alt="" />
            </div>
            <div className="details">
              <Link
                to={
                  exchange.userDTO.id === currentUser.id
                    ? "/my-profile"
                    : `/profile/${exchange.userDTO.id}`
                }
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{exchange.userDTO.name} </span>
              </Link>
              <span className="date">{formattedDate}</span>
            </div>
          </div>

          <MoreHorizIcon onClick={handleMenuClick} />
        </div>
        <div className="exchange-content">
          <p
            style={{
              fontWeight: "500",
              marginTop: "15px",
              marginBottom: "10px",
            }}
          >
            {exchange.description}
          </p>
          <div className="pet-conent">
            {/* <p>{exchange.petDTO.description}</p> */}
            <img src={exchange.petDTO.image} alt="" />
            <div className="pet-info">
              <p>Pet Name: <strong>{exchange.petDTO.name}</strong></p>
              <p>Price: <strong>{exchange.paymentAmount}</strong></p>
            </div>
          </div>
        </div>

        <div className="info">
          <button className="apply-button">Apply</button>

        </div>

        {/* {commentOpen && <Comments />} */}
      </div>
      {exchange.userDTO.id === currentUser.id ?
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={toggleEditMode}>
            {isEditMode ? "Cancel" : "Edit"}
          </MenuItem>
          <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
        </Menu>
        : null}
    </div>

  );
};

export default Exchange;
