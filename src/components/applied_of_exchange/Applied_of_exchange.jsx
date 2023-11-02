import React, { useState, useEffect } from "react";
import axios from "axios";
import "./applied_of_exchange.scss";

const Applied_of_exchange = ({ exchange}) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [applies, setApplies] = useState([]);
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    fetchApplies();
  }, [exchange]);

  const fetchApplies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/exchange/${exchange.id}/view-applies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // if (Array.isArray(response.data.data)) {
      setApplies(response.data);

      console.log("xx", applies);
      // } else {
      // console.error("Invalid comments data received:", response.data);
      // }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


  return (
    <div className="comments">
      {applies ? (
        applies.map((applie) => (
          // {upCmtDate=new Date(comment.createdTime)}
          <div key={applie.id} className="comment">
            {/* <img src={applie.userId} alt="" /> */}
            <div className="info">
              {applie.userId}
              {/* <span>{applie.userDTO.name}</span> */}
              {/* <p>{comment.content}</p> */}
            </div>
            <span className="date">
              {/* {formatTimeDifference(comment.createdTime)} */}
            </span>
          </div>
        ))
      ) : (
        <div>No applies available.</div>
        
      )}
    </div>
  );
};

export default Applied_of_exchange;
