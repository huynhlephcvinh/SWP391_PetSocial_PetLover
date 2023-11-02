import React, { useState, useEffect } from "react";
import axios from "axios";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
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
