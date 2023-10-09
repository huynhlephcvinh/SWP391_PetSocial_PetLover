// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./myprofile.scss";
// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import PlaceIcon from "@mui/icons-material/Place";
// import LanguageIcon from "@mui/icons-material/Language";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Posts from "../../components/posts/Posts"

// const MyProfile = () => {
//   const currentUser = localStorage.getItem('currentUser');
//   const [userData, setUserData] = useState(null);
//   const [jwt, setJwt] = useState();
//   const cruser = JSON.parse(localStorage.getItem('currentUser'));

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8080/user/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("12 ="+cruser.avatar);
//         console.log(response.data);
//         // setUserData(localStorage.getItem('currentUser'));
//         // if(userData.name==null){
//         //   console.log("Null me m roi");
//         // } else console.log("Co null deo dau dit me m");
//         // console.log(userData.name);

      
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);






//   return (
//     <div className="myprofile">
//       <div className="images">
//         <img
//           src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//           alt=""
//           className="cover"
//         />
//         <img
//           // src={userData && userData.avatar ? userData.avatar : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'}
//           src={cruser.avatar}
//           alt=""
//           className="myprofilePic"
//         />

//       </div>
//       <div className="myprofileContainer">
//         <div className="uInfo">
//           <div className="left">
//             <a href="http://facebook.com">
//               <FacebookTwoToneIcon fontSize="large" />
//             </a>
//             <a href="http://facebook.com">
//               <InstagramIcon fontSize="large" />
//             </a>
//             <a href="http://facebook.com">
//               <TwitterIcon fontSize="large" />
//             </a>
//             <a href="http://facebook.com">
//               <LinkedInIcon fontSize="large" />
//             </a>
//             <a href="http://facebook.com">
//               <PinterestIcon fontSize="large" />
//             </a>
//           </div>
//           <div className="center">
//             <span>{cruser.name}</span>
            
//             <div className="info">
//               <div className="item">
//                 <PlaceIcon />
//                 <span>USA</span>
//               </div>
//               <div className="item">
//                 <LanguageIcon />
//                 <span>lama.dev</span>
//               </div>
//             </div>
//             <button>Follow</button>
//           </div>
//           <div className="right">
//             <EmailOutlinedIcon />
//             <MoreVertIcon />
//           </div>
//         </div>
//         <Posts />
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
