import "./pet.scss";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
// import Modal from "react-modal";
import Modal from "react-modal";
import { BorderAll, BorderAllOutlined } from "@mui/icons-material";
import axios from 'axios';

Modal.setAppElement('#root');



const Pet = ({ pet }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');
  const openModal = () => {
    setIsModalOpen(true);
  };

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
        description:description,
        paymentAmount:price
      };
      const response = await axios.post(
        'http://localhost:8080/exchange/create',
        createExchangeDTO,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
          // params: {
          //   paymentAmount: price,
          // },
        },

      );
      console.log("Ressponensklajd:  " + JSON.stringify(response.data));
    } catch (error) {
      console.error('Error: ', error);
    }

  }



  return (
    <div className="pets">
      <div className="petcontainer">
        <div className="pet">
          <div className="petInfo">
            {/* <img  src={pet.image} alt="" /> */}
            <div className="petdetails">
              {/* <Link */}
              {/* // to={`/profile/${post.userPostDTO.id}`} */}
              {/* // style={{ textDecoration: "none", color: "inherit" }} */}
              {/* > */}
              <span className="petname">{pet.name} </span>
              {/* </Link> */}
            </div>
          </div>
          {/* <MoreHorizIcon /> */}
        </div>
        <div className="petcontent">
          <img  src={pet.image} alt="" />
          <p className="des">{pet.description}</p>
          <button onClick={openModal}>Exchange</button>

          {/* <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Exchange Modal"
            // style={{
            //   overlay: {
            //     backgroundColor: "rgba(0, 0, 0, 0.5)",
            //     zIndex: 1000,
            //   },
            //   content: {
            //     width: "600px",
            //     height:"700px",
            //     margin: "auto",
            //     padding: "20px",
            //     borderRadius: "8px",
            //   },
            // }}
          >
            <h2>Exchange Pet</h2>
            <p>Are you sure you want to exchange {pet.name}?</p>
            <label>Pet ID: </label>
            <input type="text" value={pet.id} id="pet-id" readOnly/><br />
            <label >Pet Name</label>
            <input type="text" value={pet.name} id="pet-name" readOnly /><br/>
            <label>Pet Description</label>
            <input type="text" value={pet.description} id="pet-description" readOnly/>
            
            <div style={{ textAlign: "right" }}>
              <button onClick={closeModal} style={{ marginRight: "10px" }}>
                Cancel
              </button>
              <button onClick={closeModal}>Exchange</button>
            </div>
          </Modal> */}



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


        </div>
      </div>
    </div>
  );
};

export default Pet;
