import Post from "../post/Post";
import "./posts.scss";

<<<<<<< HEAD
const Posts = ({posts, setPosts,onCommentAdded }) => {
=======
const Posts = ({ posts }) => {
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
  //Doi sua thanh status nua la  bo cmt la Ok
  // const filteredPosts = posts.filter(post => post.image != null);
  // console.log(filteredPosts);

<<<<<<< HEAD
  return <div className="postts">
    {posts.map(post=>(
      <Post setPosts={setPosts} post={post} key={post.id} posts={posts} onCommentAdded={onCommentAdded}/>
    ))}
  </div>;
=======
  return (
    <div className="postts">
      {/* {filteredPosts.map(post=>( */}
      {posts.map((post) => post.id && <Post post={post} key={post.id} />)}
    </div>
  );
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
};

export default Posts;
