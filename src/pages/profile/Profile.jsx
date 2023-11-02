import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
<<<<<<< HEAD
import Posts from "../../components/posts/Posts"
import { CenterFocusStrong } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Profile = () => {
  const currentUser = localStorage.getItem('currentUser');
  // const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState();
  const cruser = JSON.parse(localStorage.getItem('currentUser'));
  const [userData,setUserData]=useState("");
  const {userID}=useParams();
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.post(
          'http://103.253.147.216:8080/user/profile/'+userID,
          null, // body là null nếu là POST request
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("respone ne:   "+response.data.data);
           setUserData(response.data.data);
           setPosts(response.data.data.postDTOList);
          //  console.log("d]u ma may"+JSON.stringify(response.data.data.postDTOList));
          //  console.log(userData.name);

      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchProfile();
  }, [token]);






=======
import Posts from "../../components/posts/Posts";

const Profile = () => {
  console.log("Profile");
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
  return (
    <div className="profile">
      <Helmet>
        <title>{userData.name}</title>
      </Helmet>
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>Jane Doe</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>FPTU.dev</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
<<<<<<< HEAD
        {posts!="" ? (
        <Posts posts={posts}/>
        ):(
          <div className='noPosts'>Nothing here</div>
        )}
=======
        <Posts />
>>>>>>> cc57411f64ea90ab867b098b0c31c0441870af2c
      </div>
    </div>
  );
};

export default Profile;
