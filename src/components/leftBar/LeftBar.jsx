import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Pet from "../../assets/pet.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          {currentUser && (
            <div className="user">
              <img src={currentUser.avatar} alt="" />
              <span>{currentUser.name}</span>
            </div>
          )}
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <Link
            to="/market-place"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="item">
              <img src={Market} alt="" />
              <span>Marketplace</span>
            </div>
          </Link>

          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <Link to="/my-pet" style={{ textDecoration: "none", color: "black" }}>
            <div className="item">
              <img src={Pet} alt="" />
              <span>Pet</span>
            </div>
          </Link>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default LeftBar;
