import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mypets.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pets from "../../components/pets/Pets";
import Modal from "react-modal";
import Image from "../../assets/img.png";

const FormComponent = ({ state, setState, label }) => (
  <form>
    <label htmlFor={label}>
      {label}
      <input
        type="text"
        id={label}
        value={state}
        placeholder={label}
        onChange={(e) => setState(e.target.value)}
        className="modal-input"
      />
    </label>
  </form>
);

const useForm = (defaultState, label) => {
  const [state, setState] = useState(defaultState);

  return [
    state,
    <FormComponent state={state} setState={setState} label={label} />,
    setState,
  ];
};

const MyPets = () => {
  const cruser = JSON.parse(localStorage.getItem("currentUser"));

  const [pets, setPets] = useState([]);
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, NameFormComponent, setName] = useForm(""); // Create a form component for "name"
  const [description, DescriptionFormComponent, setDescription] = useForm(""); // Create a form component for "description"
  const [petType, setPetType] = useState(""); // Add petType state
  const [image, setImage] = useState(null); // Add image state
  const [selectedPet, setSelectedPet] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedPet, setUpdatedPet] = useState(null);

  const handleSelectChange = (e) => {
    setPetType(e.target.value);
  };

  const handleMoreVertClick = (pet) => {
    setSelectedPet(pet);
  };

  const handleSubmit = async () => {
    try {
      const createPetDTO = {
        file: image,
        name: name,
        description: description,
        idPetType: petType,
      };
      const response = await axios.post(
        "http://localhost:8080/pet/createpet",
        createPetDTO,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("create ne:", response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleDelete = async (petId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pet/deletepet/${petId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle the response or update the pets list as needed
      console.log("Pet deleted:", response);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleUpdatePet = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/pet/updatePet/${updatedPet.id}`,
        updatedPet,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle the response or update the pets list as needed
      console.log("Pet updated:", response);
      setIsUpdateModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setImage("");
    setDescription("");
    setName("");
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage({
        name: file.name,
        url: URL.createObjectURL(file),
      });
    }
  };

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response1 = await axios.get(
          "http://localhost:8080/pet/getAllPet",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPets(response1.data.data);
        console.log("ListPetaaaa:", response1.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPet();
  }, [token]);

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img src={cruser.avatar} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left"></div>
          <div className="center">
            <span style={{ width: "300px", textAlign: "center" }}>
              {cruser.name}
            </span>

            <button onClick={openModal}>Create Pet</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        {pets !== 0 ? (
          <Pets pets={pets} />
        ) : (
          <div className="noPosts">You don't have any pets yet</div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Pet Modal"
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

      .textModal{
        width:40%;
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
        .modal-select{
          // width:105,66%;
          padding: 8px;
          margin-top: 10px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      }

      .imgModal {
        padding-left:30px;
        width:60%;
        height: 391px;
        align-items: center;
        text-align: center;
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
          <h2 className="modal-header">Add Pet</h2>
          <div className="modal-content">
            <br />
            <div className="textModal">
              <h4>Pet Image</h4>
              <input
                type="file"
                id="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="file">
                <div className="item">
                  {image ? (
                    <>
                      Choose image:
                      {/* <img
                    style={{ marginTop: "10px", height: "30px" }}
                    src={image.url}
                    alt={image.name}
                  /> */}
                      <p>{image.name}</p>
                    </>
                  ) : (
                    <img
                      style={{ marginTop: "10px", height: "30px" }}
                      src={Image}
                      alt=""
                    />
                  )}
                </div>
              </label>
              <h4>Pet Name</h4>
              {NameFormComponent}
              <h4>Description</h4>
              {DescriptionFormComponent}
              <h4>Pet Type</h4>
              <select
                className="modal-select"
                id="petType"
                value={petType}
                onChange={handleSelectChange}
              >
                <option value="">-- Choose --</option>
                <option value="1">Dog</option>
                <option value="2">Cat</option>
              </select>
            </div>
            <div className="imgModal">
              {image ? (
                <>
                  <img
                    style={{
                      borderRadius: "5%",
                      maxWidth: "370px",
                      maxHeight: "360px",
                    }}
                    src={image.url}
                    alt=""
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <button className="modal-button cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="modal-button exchange" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyPets;
