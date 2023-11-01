import React, { useState, useEffect } from "react";
import axios from "axios";
import "./comments.scss";

const Comments = ({ postId, onCommentAdd }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  const formatTimeDifference = (createdTime) => {
    const currentTime = new Date();
    const commentTime = new Date(createdTime);
    const timeDifference = currentTime - commentTime;

    if (timeDifference < 60 * 1000) {
      return `${Math.floor(timeDifference / 1000)} seconds ago`;
    } else if (timeDifference < 60 * 60 * 1000) {
      return `${Math.floor(timeDifference / (60 * 1000))} minutes ago`;
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      return `${days} days ago`;
    }
  };
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/comments/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      // if (Array.isArray(response.data.data)) {
      setComments(response.data);

      console.log("xx", comments);
      // } else {
      // console.error("Invalid comments data received:", response.data);
      // }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const createComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/comments/user/${currentUser.id}/post/${postId}`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setComments([response.data, ...comments]);
        setNewComment("");
        onCommentAdd();
      } else {
        console.error("Invalid comment data received:", response.data);
      }
      //onPostRefresh();
    } catch (error) {
      console.error("Error creating a comment:", error);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.avatar} alt="" />
        <input
          type="text"
          placeholder="Write a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={createComment}>Send</button>
      </div>
      {comments ? (
        comments.map((comment) => (
          // {upCmtDate=new Date(comment.createdTime)}
          <div key={comment.id} className="comment">
            <img src={comment.userDTO.avatar} alt="" />
            <div className="info">
              <span>{comment.userDTO.name}</span>
              <p>{comment.content}</p>
            </div>
            <span className="date">
              {formatTimeDifference(comment.createdTime)}
            </span>
          </div>
        ))
      ) : (
        <div>No comments available.</div>
      )}
    </div>
  );
};

export default Comments;
