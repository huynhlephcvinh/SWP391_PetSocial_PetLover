import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./myprofile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import Pets from "../../components/pets/Pets";
// import { CenterFocusStrong, Pets } from '@mui/icons-material';

const Profile = () => {
  const currentUser = localStorage.getItem('currentUser');
  const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState();
  const cruser = JSON.parse(localStorage.getItem('currentUser'));

  const [pets, setPets] = useState([]);

  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   // Fetch pets
  //   async function fetchPet() {
  //     try {
  //       const response1 = await axios.get("http://localhost:8080/pet/getAllPet", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setPets(response1.data.data);
  //       console.log("ListPetaaaa:", pets);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchPet();
  // }, [token]);


  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("http://localhost:8080/post/getAllYourPost",
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
          <div className="left">

          </div>
          <div className="center">
            <span>{cruser.name}</span>

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
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        {/* {pets != "" ? (
          <Pets pets={pets} />
        ) : (
          <div className='noPosts'>You don't have any pets yet</div>
        )} */}
        {posts != "" ? (
          <Posts posts={posts} setPosts={setPosts} />
        ) : (
          <div className='noPosts'>You don't have any posts yet</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
