import React, { useEffect, useState } from "react";
import axios from "axios";
import "./staff.scss"; // Tạo một file SCSS riêng cho trang của nhân viên
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Helmet } from "react-helmet";
import Modal from "react-modal";

const StaffProfile = () => {
  const staff = JSON.parse(localStorage.getItem("currentUser")); // Sử dụng dữ liệu của nhân viên

  const [staffPosts, setStaffPosts] = useState([]); // Sử dụng dữ liệu về bài đăng của nhân viên
  const token = localStorage.getItem("token"); // Sử dụng token của nhân viên
  const [error, setError] = useState("");
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const closeMessage = () => {
    setIsMessageOpen(false);
    handleApprovePost();
  };
  const openMessage = (message) => {
    setNotificationMessage(message);
    setIsMessageOpen(true);
  };

  useEffect(() => {
    async function fetchStaffPosts() {
      try {
        const response = await axios.get(
          "https://petsocial.azurewebsites.net/staff/getAllPostDisable",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStaffPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching staff posts:", error);
      }
    }

    fetchStaffPosts();
  }, [token]);

  const handleApprovePost = (postId) => {
    // Gọi API để duyệt bài viết
    axios
      .post(
        `https://petsocial.azurewebsites.net/staff/${postId}/enable`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thay token bằng token thực tế của nhân viên
          },
        }
      )
      .then((response) => {
        // Xử lý khi duyệt bài viết thành công
        console.log("Bài viết đã được duyệt:", response.data.data);

        // Cập nhật trạng thái của bài viết trong danh sách staffPosts
        const updatedStaffPosts = staffPosts.map((post) => {
          if (post.id === postId) {
            return { ...post, isApproved: true };
          }
          return post;
        });

        setStaffPosts(updatedStaffPosts);
        // Hoặc bạn có thể tải lại danh sách bài viết sau khi duyệt bài viết thành công.
        openMessage("Accept Successfully");

        setTimeout(() => {
          setIsMessageOpen(false);
        }, 2000);

        setStaffPosts((prevStaffPosts) =>
          prevStaffPosts.filter((post) => post.id !== postId)
        );
      })
      .catch((error) => {
        // Xử lý lỗi khi duyệt bài viết
        console.error("Lỗi khi duyệt bài viết:", error);
      });
  };

  const handleReject = (postId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`https://petsocial.azurewebsites.net/staff/${postId}/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("xx", response.data);
          // Loại bỏ bài đăng bị từ chối khỏi danh sách posts
          setStaffPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );

          openMessage("Reject Successfully");
          setIsMessageOpen(true);
        })
        .catch((error) => {
          console.error("Error rejecting post:", error);
        });
    }
  };

  return (
    <div className="staff-profile">
      <Helmet>
        <title>Staff</title>
      </Helmet>
      <div className="profileContainer">
        {staffPosts.length > 0 ? (
          <div>
            {staffPosts.map((post) => (
              <div key={post.id} className="pet-approval-frame">
                <div className="pet-approval-box">
                  <div className="avatar-container">
                    <img
                      src={post.userPostDTO.avatar}
                      alt=""
                      className="avatar"
                    />
                    <p>{post.userPostDTO.name}</p>
                  </div>

                  <p>{post.content}</p>
                  <img src={post.image} alt="" />
                  <div style={{ textAlign: "right" }}>
                    <button
                      onClick={() => handleApprovePost(post.id)}
                      className="approve-button"
                      style={{ marginRight: "5px" }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(post.id)}
                      className="reject-button"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="noPosts">
            This staff member doesn't have any posts yet
          </div>
        )}
      </div>
      <Modal
        isOpen={isMessageOpen}
        onRequestClose={closeMessage}
        contentLabel="Staff Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          content: {
            width: "300px",
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
            textAlign: "center",
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
          <div className="modal-content">{error}</div>
          <p>{notificationMessage}</p>
        </div>
      </Modal>
    </div>
  );
};

export default StaffProfile;
