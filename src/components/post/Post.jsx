import "./post.scss";
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


const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const calculateTimeDifference = (createDate) => {
    const currentDate = new Date();
    const [day, month, yearTime] = createDate.split('-');
    const [year, time] = yearTime.split(' ');
    const [hours, minutes] = time.split(':');
    const postCreateDate = new Date(year, month - 1, day, hours, minutes);  
    const timeDifference = currentDate - postCreateDate;
  
    let formattedDate;
  
    if (timeDifference < 60 * 1000) {
      formattedDate = `${Math.floor(timeDifference / 1000)} seconds ago`;
    } else if (timeDifference < 60 * 60 * 1000) {
      formattedDate = `${Math.floor(timeDifference / (60 * 1000))} minutes ago`;
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
      formattedDate = `${hours} hours ago`;
    } else {
      const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      formattedDate = `${days} days ago`;
    }
  
    return formattedDate;
  };

  const formattedDate = calculateTimeDifference(post.create_date);
  // console.log("fomasd",formattedDate);



  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //TEMPORARY
  const liked = false;


  const [menuAnchor, setMenuAnchor] = useState(null);
  const handleMenuClick = (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  }

  const handleMenuDelete = () => {
    const token = localStorage.getItem('token');
    const response = axios.delete("http://localhost:8080/post/delete/" + post.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log(response);
    if (response.data === "Not Found") {
      console.log("Delete deo duoc");
      //Lam cai message
    } else {
      console.log("Delete duoc roi");
      //Lam message
    }
    window.location.reload();

  }

  const handleMenuUpdate = () => {

  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <div className="avatar">
              <img className="avtuser" src={post.userPostDTO.avatar} alt="" />
              <img className="avtpet" src={post.petToPostDTO.image} alt="" />
            </div>
            <div className="details">
              <Link
                to={post.userPostDTO.id === currentUser.id ? '/my-profile' : `/profile/${post.userPostDTO.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.userPostDTO.name} </span> <span style={{ fontSize: 14 }}>with</span><span> {post.petToPostDTO.name}</span>
              </Link>
              <span className="date">{formattedDate}</span>
            </div>
          </div>

          <MoreHorizIcon onClick={handleMenuClick} />


        </div>
        <div className="content">
          <p>{post.content}</p>
          <img src={post.image} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {post.total_like} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
      {post.userPostDTO.id === currentUser.id ?
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
          <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
        </Menu>
        : null}
    </div>
  );
};

export default Post;
