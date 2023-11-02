import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./home.scss"
import { Helmet } from "react-helmet";

const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const [refreshCmt,setRefreshCmt]=useState(0);
  
  const handleCommentAdded = () => {
    setRefreshCmt(prevTotal => prevTotal + 1);
  };
  const handlePostCreated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };


  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("http://103.253.147.216:8080/post/getAllPost",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, [token]);

  return (
    <div className="home">
      <Helmet>
        <title>Home</title>
      </Helmet>
      {/* <Stories/> */}
      {/* <Share /> */}
      <Share onPostCreated={handlePostCreated} key={refreshKey} />
      {posts && (
        <Posts posts={posts} setPosts={setPosts} onCommentAdded={handleCommentAdded}/>
      )}

    </div>
  )
}

export default Home