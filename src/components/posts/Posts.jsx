import Post from "../post/Post";
import "./posts.scss";

const Posts = ({ posts }) => {
  //Doi sua thanh status nua la  bo cmt la Ok
  // const filteredPosts = posts.filter(post => post.image != null);
  // console.log(filteredPosts);

  return (
    <div className="postts">
      {/* {filteredPosts.map(post=>( */}
      {posts.map((post) => post.id && <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
