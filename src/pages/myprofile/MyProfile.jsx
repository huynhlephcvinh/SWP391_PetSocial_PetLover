import React, { useEffect, useState } from "react";
import axios from "axios";
import "./myprofile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";

const Profile = () => {
  const cruser = JSON.parse(localStorage.getItem("currentUser"));

  const [pets, setPets] = useState([]);

  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch pets
    async function fetchPet() {
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
        console.log("ListPetaaaa:", pets);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPet();
  }, [token]);

  useEffect(() => {
    async function fetchPosts() {
      try {
<<<<<<< HEAD
        const response = await axios.get("http://103.253.147.216:8080/post/getAllYourPost",
=======
        const response = await axios.get(
          "http://localhost:8080/post/getAllYourPost",
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data.data);
        console.log("Post: " + posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      //
<<<<<<< HEAD

=======
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
    }

    fetchPosts();
  }, [token]);

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          // src={userData && userData.avatar ? userData.avatar : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'}
          src={cruser.avatar}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
<<<<<<< HEAD
          <div className="left">

          </div>
=======
          <div className="left"></div>
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
          <div className="center">
            <span style={{ width: "300px", textAlign: "center" }}>
              {cruser.name}
            </span>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>

        {posts != "" ? (
          <Posts posts={posts} setPosts={setPosts} />
        ) : (
          <div className="noPosts">You don't have any posts yet</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
