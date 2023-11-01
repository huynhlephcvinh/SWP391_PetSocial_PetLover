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
import { useEffect } from "react";

const Post = ({ post }) => {
  const token = localStorage.getItem("token");
  const [commentOpen, setCommentOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [liked, setLiked] = useState(false);
  const [tempLiked, setTempLiked] = useState(false);
  const [tempTotalLikes, setTempTotalLikes] = useState(post.total_like);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [postRefresh, setPostRefresh] = useState(0);
  const [isEditMode, setEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(post.content);
  const [editingContent, setEditingContent] = useState(post.content); // Thêm trạng thái để lưu nội dung đang chỉnh sửa
  const [editingImage, setEditingImage] = useState(post.image);
  const [updatedImage, setUpdatedImage] = useState(post.image);
  const [totalComments, setTotalComments] = useState(post.total_comment);

  useEffect(() => {
    updateTotalLikes();
  }, []);

  const updateTotalLikes = () => {
    setTempTotalLikes(post.total_like);
    setLiked(post.fieldReaction);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleRefresh = () => {
    setPostRefresh((prev) => prev + 1);
  };

  const updateTotalComments = () => {
    setTotalComments(totalComments + 1);
  };

  const handleMenuDelete = () => {
    const response = axios.delete(
      `http://localhost:8080/post/delete/${post.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.data === "Not Found") {
      console.log("Delete chưa được");
    } else {
      console.log("Delete được rồi");
    }

    window.location.reload();
  };

  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };

  // const handleSaveChanges = () => {
  //   const updatedContent = editingContent;
  //   const updatedImage = editingImage || post.image;

  //   setUpdatedContent(updatedContent); // Cập nhật nội dung bài viết
  //   setEditMode(false); // Thoát khỏi chế độ chỉnh sửa
  // };

  const handleMenuUpdate = () => {
    const updatedContent = editingContent;

    setUpdatedContent(updatedContent); // Cập nhật nội dung bài viết
    setEditMode(false);

    const updatedPost = {
      id: post.id,
      content: updatedContent, // Sử dụng nội dung đang chỉnh sửa
      // Không bao gồm cập nhật hình ảnh
    };

    axios
      .put(`http://localhost:8080/post/update/${post.id}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUpdatedContent(updatedContent);
          toggleEditMode();
        } else {
          console.error("Update failed");
        }
      })
      .catch((error) => {
        console.error("Error updating the post:", error);
      });
  };

  const handleLikeClick = () => {
    const newLiked = !liked;

    axios
      .post(`http://localhost:8080/reaction/${post.id}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLiked(newLiked);
          setTempLiked(newLiked);
          setTempTotalLikes(newLiked ? tempTotalLikes + 1 : tempTotalLikes - 1);
        } else {
          console.error(
            `Lỗi khi thực hiện hành động ${newLiked ? "like" : "unlike"}`
          );
        }
      })
      .catch((error) => {
        console.error("Lỗi kết nối đến máy chủ.");
      });
  };

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
                to={
                  post.userPostDTO.id === currentUser.id
                    ? "/my-profile"
                    : `/profile/${post.userPostDTO.id}`
                }
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.userPostDTO.name} </span>{" "}
                <span style={{ fontSize: 14 }}>with</span>
                <span> {post.petToPostDTO.name}</span>
              </Link>
              <span className="date">{post.create_date}</span>
            </div>
          </div>

          <MoreHorizIcon onClick={handleMenuClick} />
        </div>
        {isEditMode ? ( // Kiểm tra nếu đang ở chế độ chỉnh sửa
          <div className="content">
            <div className="content-wrapper">
              <input
                className="content-text"
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
              />
              <button className="save-button" onClick={handleMenuUpdate}>
                Save
              </button>
            </div>
            <img src={editingImage} alt="" />
          </div>
        ) : (
          <div className="content">
            <p>{updatedContent}</p>{" "}
            {/* Sử dụng updatedContent để hiển thị nội dung */}
            <img src={updatedImage} alt="" />
          </div>
        )}
        <div className="info">
          <div className="item" onClick={handleLikeClick}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {tempTotalLikes} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {post.total_comment} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && (
          <Comments
            postId={post.id}
            onCommentAdd={updateTotalComments}
            key={postRefresh}
          />
        )}
      </div>
      {post.userPostDTO.id === currentUser.id ? (
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
      ) : null}
    </div>
  );
};

export default Post;
