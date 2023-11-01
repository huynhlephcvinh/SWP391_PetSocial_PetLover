import { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          "http://localhost:8080/post/getAllPost",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && Array.isArray(response.data.data)) {
          setPosts(response.data.data);
          console.log(response.data.data); // Log the response data to inspect its structure.
        } else {
          console.error("Invalid response data format:", response.data);
        }
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
      <div className="home-content">
        <Share />
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Home;
