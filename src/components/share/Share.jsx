import "./share.scss";
import Image from "../../assets/img.png";
import Pet from "../../assets/pet.png";
import MyPets from "../../pages/MyPets/MyPets";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useEffect } from "react";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [postText, setPostText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    // Update the selected image file when the file input changes
    const file = e.target.files[0];
    setImageFile(file);
    console.log(file);

    const reader = new FileReader();
    reader.onload = () => {
      const imageResult = reader.result; // Get the result from the reader
      setSelectedImage(imageResult);
      console.log(imageResult); // Now you have the selected image
    };
    reader.readAsDataURL(file);
  };

  const handlePost = () => {
    // Create a FormData object to send both text, image, and idPet
    const formData = new FormData();
    formData.append("content", postText);
    formData.append("image", selectedImage);
    formData.append("idPet", selectedPet); // Append the idPet here
    console.log(formData);

    // POST request to create a new post
    axios
      .post("http://localhost:8080/post/createpost", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the JWT token in the headers
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      })
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log("Post created:", response.data.data);
        setPostText("");
        setSelectedImage(null);
        setSelectedPet(null); // Reset idPet to an appropriate value
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Error creating post:", error);
      });
  };

  const fetchPosts = () => {
    // Fetch the posts from the server
    axios
      .get("http://localhost:8080/getAllPost", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      })
      .then((response) => {
        // Update the posts state with the fetched data
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    // Fetch the initial posts when the component mounts
    fetchPosts();
  }, []);

  if (!currentUser) {
    // Handle the case when currentUser is not available
    return <div>Not logged in</div>;
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.avatar} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind, ${currentUser.name}?`}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        {selectedImage && (
          <img
            className="post-img"
            src={selectedImage}
            alt="Selected"
            style={{ maxWidth: "100%" }}
          />
        )}
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Pet} alt="" />
              <span>Add Pet</span>
            </div>
          </div>

          <div className="right">
            <button onClick={handlePost}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
