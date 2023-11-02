import React, { useEffect, useState } from "react";
import axios from "axios";
import "./staff.scss"; // Tạo một file SCSS riêng cho trang của nhân viên
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StaffProfile = () => {
  const staff = JSON.parse(localStorage.getItem("currentUser")); // Sử dụng dữ liệu của nhân viên

  const [staffPosts, setStaffPosts] = useState([]); // Sử dụng dữ liệu về bài đăng của nhân viên
  const token = localStorage.getItem("token"); // Sử dụng token của nhân viên

  useEffect(() => {
    async function fetchStaffPosts() {
      try {
        const response = await axios.get(
          "http://localhost:8080/staff/getAllPostDisable",
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
      .post(`http://localhost:8080/staff/${postId}/enable`, null, {
        headers: {
          Authorization: `Bearer ${token}`, // Thay token bằng token thực tế của nhân viên
        },
      })
      .then((response) => {
        // Xử lý khi duyệt bài viết thành công
        console.log("Bài viết đã được duyệt:", response.data.data);
        // Cập nhật trạng thái của bài viết trong state hoặc tải lại danh sách bài viết
      })
      .catch((error) => {
        // Xử lý lỗi khi duyệt bài viết
        console.error("Lỗi khi duyệt bài viết:", error);
      });
  };

  return (
    <div className="staff-profile">
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
                  <button
                    onClick={() => handleApprovePost(post.id)}
                    className="approve-button"
                  >
                    Accept
                  </button>
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
    </div>
  );
};

export default StaffProfile;
