import React, { useState, useEffect } from "react";
import axios from "axios";
import "./applied_of_exchange.scss";
import Modal from "react-modal";

const Applied_of_exchange = ({ exchange, onCountChange }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [applies, setApplies] = useState([]);
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applyCount, setApplyCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplies();
  }, [exchange]);

  const fetchApplies = async () => {
    try {
      const response = await axios.get(
        `https://petsocial.azurewebsites.net/exchange/${exchange.id}/view-applies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // if (Array.isArray(response.data.data)) {
      setApplies(response.data);
      setApplyCount(response.data.length);
      onCountChange(response.data.length);
      setError("The exchange has been successfully accepted");
      console.log("xx", applies);
      // } else {
      // console.error("Invalid comments data received:", response.data);
      // }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAccept = async (applieId) => {
    try {
      const response = await axios.put(
        `https://petsocial.azurewebsites.net/exchange/${applieId}/completed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success, e.g., update state or show a success message
      console.log("Exchange completed:", response.data);
      setIsModalOpen(true);

      // Optionally, you can refetch applies to update the UI
      fetchApplies();
    } catch (error) {
      console.error("Error completing exchange:", error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="comments-e">
      {applies.length > 0 ? (
        applies.map((applie) => (
          // {upCmtDate=new Date(comment.createdTime)}
          <div key={applie.id} className="comment-e">
            {/* <img src={applie.userId} alt="" /> */}
            <div className="info">
              {/* {applie.userId} */}

              <img src={applie.userApplied.avatar} alt="" />
              <span>{applie.userApplied.name}</span>
              <button onClick={() => handleAccept(applie.exchange.id)}>
                Accept
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No applies available.</div>
      )}
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Accept Success Modal"
      >
        <h2>Accept Success</h2>
        <p>The exchange has been successfully accepted.</p>
        <button onClick={closeModal}>Close</button>
      </Modal> */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Accept Success Modal"
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
            width: "200px",
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
        </div>
      </Modal>
    </div>
  );
};

export default Applied_of_exchange;
