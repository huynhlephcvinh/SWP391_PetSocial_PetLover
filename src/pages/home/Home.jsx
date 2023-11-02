import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";
import axios from "axios";
import "./home.scss"

const Home = () =>{
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("http://localhost:8080/post/getAllPost",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data.data);
        // console.log(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, [token]);

  // const updatePosts = (newPost) => {
  //   // Append the new post to the existing posts array
  //   setPosts((prevPosts) => [newPost, ...prevPosts]);
  // };

  return (
    <div className="home">
      {/* <Stories/> */}
      <Share />
      <Posts posts={posts}/>
    </div>
  );
};

export default Home;
