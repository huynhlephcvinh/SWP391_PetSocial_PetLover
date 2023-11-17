import "./pet.scss";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
// import Modal from "react-modal";
import Modal from "react-modal";
import { BorderAll, BorderAllOutlined } from "@mui/icons-material";
import axios from "axios";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

Modal.setAppElement("#root");

const Pet = ({ pet, setPets, pets }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  // const [modalMessage, setModalMessage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(pet.name);
  const [updatedName, setUpdatedName] = useState(pet.name);
  const [error, setError] = useState("");

  const [editedDescription, setEditedDescription] = useState(pet.description);
  const [updatedDescription, setUpdatedDescription] = useState(pet.description);

  const [editedImage, setEditedImage] = useState(pet.image);
  const [updatedImage, setUpdatedImage] = useState("");

  const [selectedFile, setSelectedFile] = useState("");
  // const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const token = localStorage.getItem("token");
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeMessage = () => {
    setIsMessageOpen(false);
    setPets(pets.filter((item) => item.id !== pet.id));
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleMenuClick = (event) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setUpdatedImage(file);
      setSelectedFile({
        name: file.name,
        url: URL.createObjectURL(file),
      });
    } else {
      setUpdatedImage(pet.image);
      setSelectedFile(null);
    }

    console.log("Selected File:", file);
    console.log("Selected Image URL:", setSelectedFile);
  };

  const handleSubmit = async () => {
    try {
      const createExchangeDTO = {
        petDTO: {
          id: pet.id,
          image: pet.image,
          name: pet.name,
          description: pet.description,
        },
        description: description,
        paymentAmount: price,
      };

      const response = await axios.post(
        "https://petsocial.azurewebsites.net/exchange/create",
        createExchangeDTO,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Exchange created successfully
        setIsModalOpen(true);
        setError("Exchange created successfully.");
        console.log("Exchange created successfully:", response.data);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setError("Exchange is already exist.");
        console.log("Exchange is already exist:");
      } else {
        setError("Error");
      }
    } finally {
      setIsMessageOpen(true);
    }
  };

  const handleUpdatePet = () => {
    const updatedPet = {
      id: pet.id,
      name: updatedName,
      description: updatedDescription,
    };
    if (updatedImage) {
      updatedPet.file = updatedImage;
    }
    console.log("Updated Pet:", updatedPet);

    axios
      .put(
        `https://petsocial.azurewebsites.net/pet/updatePet/${pet.id}`,
        updatedPet,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toggleEditMode();
          console.log("Update Successful: ", response.data);
          setError("Update success");
          setIsMessageOpen(true);
        } else {
          console.log("Update failed");
          setError("Update failed");
          setIsMessageOpen(true);
        }
      })
      .catch((error) => {
        console.error("Error updating the pet:", error);
        setError("Update failed");
        setIsMessageOpen(true);
      });
  };

  const handleMenuDelete = () => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      axios
        .get(`https://petsocial.azurewebsites.net/pet/delete/${pet.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // Xử lý khi xóa thành công, ví dụ chuyển người dùng đến trang khác hoặc làm mới danh sách thú cưng
            // setPets(pets.filter((item) => item.id !== pet.id));
            console.log("Pet deleted successfully");
            setError("Pet deleted successfully");
            setIsMessageOpen(true);
          } else {
            console.error("Delete failed");
            setError("Delete failed");
            setIsMessageOpen(true);
          }
        })
        .catch((error) => {
          console.error("Error deleting the pet:", error);
        });
    }
  };
  const handleGift = () => {
    setPrice(0);
    setDescription("Gift");
    openModal();
  };
  return (
    <div className="pets">
      <div className="petcontainer">
        <div className="pet">
          {/* <div className="petInfo"> */}
          {/* <img  src={pet.image} alt="" /> */}
          {/* <div className="petdetails"></div>
          </div>  */}
          <MoreVertOutlinedIcon className="right" onClick={handleMenuClick} />
        </div>
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
          <MenuItem onClick={toggleEditMode}>
            {isEditMode ? "Cancel" : "Edit"}
          </MenuItem>
          <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
        </Menu>
        <div className="petcontent">
          {/* <img src={updatedImage || pet.image} alt="" /> */}
          <img src={selectedFile ? selectedFile.url : pet.image} alt="" />

          <div className="petInfo">
            {isEditMode ? (
              <div className="editFieldsContainer">
                <div className="editField">
                  <label htmlFor="name">Name: </label>
                  <input
                    type="text"
                    id="name"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    style={{
                      padding: "5px 10px",
                      width: "200px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="editField">
                  <label htmlFor="description">Description: </label>
                  <textarea
                    type="text"
                    id="description"
                    rows="4"
                    cols="50"
                    placeholder="Input description"
                    style={{
                      borderRadius: "5px",
                      fontSize: "17px",
                      width: "350px",
                    }}
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                </div>
                <div className="editField">
                  <label htmlFor="file">File: </label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            ) : (
              <div className="editFieldsContainer">
                <p>
                  <strong>Name: </strong>
                  {updatedName}
                </p>
                <p>
                  <strong>Description: </strong> {updatedDescription}
                </p>
                {/* Sử dụng updatedContent để hiển thị nội dung */}
              </div>
            )}
          </div>
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
                <img
                  style={{
                    borderRadius: "5%",
                    marginTop: "20px",
                    marginRight: "30px",
                    maxWidth: "400px",
                    maxHeight: "300px",
                  }}
                  src={pet.image}
                  alt=""
                />
                <br />
                <div>
                  {/* <label>Pet Name</label> */}
                  <h4>Pet Name</h4>
                  <input
                    className="modal-input"
                    type="text"
                    value={pet.name}
                    id="pet-name"
                    readOnly
                  />
                  <br />
                  {/* <label>Pet Description</label> */}

                  <h4>Price</h4>
                  <input
                    className="modal-input"
                    type="text"
                    id="pet-price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  <h4>Description</h4>
                  <textarea
                    className="modal-textarea"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                  />
                  <p className="modal-body">
                    Are you sure you want to exchange{" "}
                    <strong>{pet.name}</strong>?
                  </p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <button className="modal-button cancel" onClick={closeModal}>
                Cancel
              </button>
              <button className="modal-button exchange" onClick={handleSubmit}>
                Exchange
              </button>
            </div>
          </Modal>
        </div>
        <div style={{ display: "inline-grid" }}>
          <button
            style={{ marginBottom: "5px" }}
            onClick={isEditMode ? handleUpdatePet : openModal}
          >
            {isEditMode ? "Save" : "Exchange"}
          </button>
          <button style={{ backgroundColor: "#F08080" }} onClick={handleGift}>
            Gift
          </button>
        </div>

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
    </div>
  );
};

export default Pet;
