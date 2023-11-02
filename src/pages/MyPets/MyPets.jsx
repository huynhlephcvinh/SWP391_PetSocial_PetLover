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

<<<<<<< HEAD
// import { CenterFocusStrong, Pets } from '@mui/icons-material';

const MyPets = () => {
  const cruser = JSON.parse(localStorage.getItem('currentUser'));
  const [isMessageOpen,setIsMessageOpen]=useState(false);

  const [pets, setPets] = useState([]);
  const [petCreate,setPetCreate] = useState('');
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [petType, setPetType] = useState('');
  const [image, setImage] = useState('');
  const [imageView, setImageView] = useState('');
  const [error, setError] = useState('');

  const handleSelectChange = (e) => {
    setPetType(e.target.value);
  };

  function isFormValid() {
    return name.trim() !== "" && petType.trim() !== "" && image !== "";
  }

  if (!isFormValid) {
    setError("Error! Please check your fields!");
  }

  const handleSubmit = async () => {
    try {
      const createPetDTO = {
        file: image,
        name: name,
        description: description,
        idPetType: petType
      };
      const response = await axios.post('http://103.253.147.216:8080/pet/createpet', createPetDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setPetCreate(response.data);
      setError("Add Success");
      closeModal();
      openMessage();
    } catch (error) {
      setError("Error! Please check your fields!");
    }
  };

  const openMessage=()=>{
    setIsMessageOpen(true);
  }
  const closeMessage=()=>{
    setIsMessageOpen(false);

  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setImage('');
    setDescription('');
    setName('');
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageView({
        name: file.name,
        url: URL.createObjectURL(file),
      })
    }
  };

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response1 = await axios.get("http://103.253.147.216:8080/pet/getAllPet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPets(response1.data.data);
=======
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
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
      } catch (error) {
        console.error(error);
      }
    };

    fetchPet();
  }, [petCreate]);


  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
<<<<<<< HEAD
        <img
          src={cruser.avatar}
          alt=""
          className="profilePic"
        />

      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">

          </div>
=======
        <img src={cruser.avatar} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left"></div>
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
          <div className="center">
            <span style={{ width: "300px", textAlign: "center" }}>
              {cruser.name}
            </span>

<<<<<<< HEAD
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
=======
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
            <button onClick={openModal}>Create Pet</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
<<<<<<< HEAD
        {/* <button onClick={openModal}>Create Pet</button> */}
        {pets != "" ? (
          <Pets pets={pets} setPets={setPets} />
=======
        {pets !== 0 ? (
          <Pets pets={pets} />
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
        ) : (
          <div className="noPosts">You don't have any pets yet</div>
        )}
      </div>

<<<<<<< HEAD

=======
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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

<<<<<<< HEAD

=======
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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
<<<<<<< HEAD
      



      

      
=======

>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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
<<<<<<< HEAD
            <div className='textModal'>
              {/* <label>Pet Name</label> */}
=======
            <div className="textModal">
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
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
<<<<<<< HEAD
                        style={{ marginTop: "10px", height: "30px" }}
                        src={image.url}
                        alt={image.name}
                      /> */}
                      <p>{image.name}</p>
                    </>
                  ) : (
                    <img style={{ marginTop: "10px", height: "30px" }} src={Image} alt="" />
                  )}
                </div>
              </label>
              <br />
              <h4>Pet Name</h4>
              <input className="modal-input" type="text" id="pet-name" value={name} onChange={(e) => setName(e.target.value)} />

              <h4>Description</h4>
              <textarea className="modal-textarea" type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="description" />
              <h4>Pet Type</h4>
              <select className='modal-select' id="petType" value={petType} onChange={handleSelectChange}>
=======
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
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
                <option value="">-- Choose --</option>
                <option value="1">Dog</option>
                <option value="2">Cat</option>
              </select>
            </div>
<<<<<<< HEAD
            <div className='imgModal'>
              {image ? (
                <>
                  {/* , marginTop: "20px", marginLeft: "30px" */}
                  <img style={{ borderRadius: "5%", maxWidth: "370px", maxHeight: "360px" }} src={imageView.url} alt="" />
                </>
              ) : (
                null
              )}
=======
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
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
<<<<<<< HEAD

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
=======
          <button className="modal-button cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="modal-button exchange" onClick={handleSubmit}>
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
            Create
          </button>
        </div>
      </Modal>
<<<<<<< HEAD


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
=======
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
    </div>
  );
};

export default MyPets;