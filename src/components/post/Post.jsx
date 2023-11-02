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
<<<<<<< HEAD
import Modal from "react-modal";
import { useEffect } from "react";


const Post = ({ post, setPosts, posts, onCommentAdded }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [postRefresh, setPostRefresh] = useState(0);
  const token = localStorage.getItem("token");
  const [refreshCmt, setRefreshCmt] = useState(0);




  //phan like, cmt, update cua Khoa
  const [liked, setLiked] = useState(false);
  const [tempTotalLikes, setTempTotalLikes] = useState(post.total_like);
  const [isEditMode, setEditMode] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(post.content);
  const [editingContent, setEditingContent] = useState(post.content);
  const [editingImage, setEditingImage] = useState(post.image);
  const [updatedImage, setUpdatedImage] = useState(post.image);
  const [totalComments, setTotalComments] = useState(post.total_comment);
  const [tempLiked, setTempLiked] = useState(false);


=======
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
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c

  const updateTotalLikes = () => {
    setTempTotalLikes(post.total_like);
    setLiked(post.fieldReaction);
<<<<<<< HEAD
  };
  const handleRefresh = () => {
    setPostRefresh((prev) => prev + 1);
  };
  const updateTotalComments = () => {
    setTotalComments(totalComments + 1);
  };
  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };
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
      .put(`http://103.253.147.216:8080/post/update/${post.id}`, updatedPost, {
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
      .post(`http://103.253.147.216:8080/reaction/${post.id}/like`, null, {
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
          console.error(error);
        }
      })
      .catch((error) => {
        console.error("Lỗi kết nối đến máy chủ.");
      });
  };

  //phan like, cmt, update cua Khoa

  const handleAddComment = () => {
    onCommentAdded();
  };


  const openImage = () => {
    setIsOpenImage(true);
  }
  const closeImage = () => {
    setIsOpenImage(false);
  }
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
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const formattedDate = calculateTimeDifference(post.create_date);
  // console.log("fomasd",formattedDate);



  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const [menuAnchor, setMenuAnchor] = useState(null);
=======
  };

>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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

<<<<<<< HEAD
  const handleMenuDelete = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.delete("http://103.253.147.216:8080/post/delete/" + post.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    setPosts(posts.filter(item => item.id !== post.id))
    console.log(response.data);
    handleMenuClose();
    if (response.data === "Not Found") {
      setError("Failed to delete");
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
      setError("Delete success");
    }
    // window.location.reload();
=======
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
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c

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
<<<<<<< HEAD


=======
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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
<<<<<<< HEAD
            <p onClick={openImage}>{updatedContent}</p>{" "}
=======
            <p>{updatedContent}</p>{" "}
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
            {/* Sử dụng updatedContent để hiển thị nội dung */}
            <img src={updatedImage} alt="" />
          </div>
        )}
<<<<<<< HEAD
        {/* <div className="content">                                            goc
          <p>{post.content}</p>                                                 goc
          <img src={post.image} alt="" onClick={openImage} />                   goc
        </div> */}
=======
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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
<<<<<<< HEAD
        {commentOpen && <Comments postId={post.id} onCommentAdded={handleAddComment} key={postRefresh} />}
=======
        {commentOpen && (
          <Comments
            postId={post.id}
            onCommentAdd={updateTotalComments}
            key={postRefresh}
          />
        )}
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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
<<<<<<< HEAD
          <MenuItem onClick={toggleEditMode}>Edit</MenuItem>
          <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
        </Menu>
        : null}



      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Exchange Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          },
          content: {
            width: "150px",
            height: "fit-content",
            maxHeight: "20vh",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            background: "#fff",
            fontFamily: "Arial, sans-serif",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center"
          },
        }}
      >
        <style>
          {`
    .modal-content{
      display: flex;
    }
      .modal-header {
        margin-bottom: 20px;
        color: #333;
      }

      .modal-body {
        margin-bottom: 20px;
        color: #555;
      }
    `}
        </style>
        <div>
          <h2 className="modal-header">Message</h2>
          <div className="modal-content">
            {error}
          </div>
        </div>
      </Modal>


      <Modal
        isOpen={isOpenImage}
        onRequestClose={closeImage}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "50%",
            maxWidth: "none",
            margin: "auto",
            overflow: "hidden"
          },
        }}
      >
        <div>
        </div>
        <div>
          <img src={post.image} alt="" style={{ width: "100%" }} />
        </div>
      </Modal>


=======
          <MenuItem onClick={toggleEditMode}>
            {isEditMode ? "Cancel" : "Edit"}
          </MenuItem>
          <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
        </Menu>
      ) : null}
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
    </div>




  );
};

export default Post;
