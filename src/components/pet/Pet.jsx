import "./pet.scss";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
// import Modal from "react-modal";
import Modal from "react-modal";
import axios from 'axios';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

Modal.setAppElement('#root');



const Pet = ({ pet, setPets, pets }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');
  const [error, setError] = useState('');
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeMessage=()=>{
    setIsMessageOpen(false);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleSubmit = async () => {
    try {
      const createExchangeDTO = {
        petDTO: {
          id: pet.id,
          image: pet.image,
          name: pet.name,
          description: pet.description
        },
        description: description,
        paymentAmount: price
      };
      const response = await axios.post(
        'http://localhost:8080/exchange/create',
        createExchangeDTO,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        },
      );
      if (response.status === 200) {
        setError("Success!");
        closeModal();
        setIsMessageOpen(true);
      } else {
        setError("Failed! Please check again");
      }
    } catch (error) {
      console.error('Error: ', error);
    }

  }




  const [menuAnchor, setMenuAnchor] = useState(null);
  const handleMenuClick = (event) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  }

  const handleMenuDelete = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:8080/pet/delete/" + pet.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    setPets(pets.filter(item => item.id !== pet.id))

    console.log(response.data);
    handleMenuClose();
    if (response.data === "Not Found") {
      setError("Failed to delete");
      setIsMessageOpen(true);
    } else {
      setError("Delete success");
      setIsMessageOpen(true);
    }
  }

  return (
    <div className="pets">
      <div className="petcontainer">
        <div className="pet">
          <div className="petInfo">
            <div className="petdetails">
              <span className="petname">{pet.name} </span>
            </div>

          </div>
          <MoreHorizIcon onClick={handleMenuClick} />

          {/* <MoreHorizIcon /> */}
        </div>
        <div className="petcontent">
          <img src={pet.image} alt="" />
          <p className="des">{pet.description}</p>
          <button onClick={openModal}>Exchange</button>
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
              },
              content: {
                width: "750px",
                height: "fit-content",
                maxHeight: "80vh",
                margin: "auto",
                padding: "20px",
                borderRadius: "10px",
                background: "#fff",
                fontFamily: "Arial, sans-serif",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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

      .modal-input {
        width: 100%;
        padding: 8px;
        margin-top: 10px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
      }

      .modal-textarea {
        width: 100%;
        height:50px;
        padding: 8px;
        margin-top: 10px;
        margin-bottom: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        resize: none;
        // overflow: hidden;
      }

      .modal-button {
        padding: 8px 16px;
        margin-right: 10px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
      }

      .modal-button.cancel {
        background-color: #ddd;
        color: #333;
        transition: background-color 0.3s ease-in-out;
      }

      .modal-button.exchange {
        background-color: #4CAF50;
        color: #fff;
        transition: background-color 0.3s ease-in-out;
      }
    `}
            </style>
            <div>
              <h2 className="modal-header">Exchange Pet</h2>
              {/* <label>Pet Image: </label> */}
              {/* <input className="modal-input" type="text" value={pet.id} id="pet-id" readOnly />
     */}
              <div className="modal-content">
                <img style={{ borderRadius: "5%", marginTop: "20px", marginRight: "30px", maxWidth: "400px", maxHeight: "300px" }} src={pet.image} alt="" />
                <br />
                <div>
                  {/* <label>Pet Name</label> */}
                  <h4>Pet Name</h4>
                  <input className="modal-input" type="text" value={pet.name} id="pet-name" readOnly />
                  <br />
                  {/* <label>Pet Description</label> */}

                  <h4>Price</h4>
                  <input className="modal-input" type="text" id="pet-price" value={price} onChange={(e) => setPrice(e.target.value)} />

                  <h4>Description</h4>
                  <textarea className="modal-textarea" type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="description" />
                  <p className="modal-body">Are you sure you want to exchange <strong>{pet.name}</strong>?</p>

                </div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>

              <button
                className="modal-button cancel"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="modal-button exchange"
                onClick={handleSubmit}
              >
                Exchange
              </button>
            </div>
          </Modal>

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



          <Modal
            isOpen={isMessageOpen}
            onRequestClose={closeMessage}
            contentLabel="Exchange Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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

        </div>
      </div>
    </div>
  );
};

export default Pet;
