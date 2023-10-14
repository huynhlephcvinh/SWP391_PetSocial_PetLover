import "./post.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";


const Pet = ({ pet }) => {
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
              <img  src={pet.image} alt="" />
            <div className="details">
              {/* <Link */}
                {/* // to={`/profile/${post.userPostDTO.id}`} */}
                {/* // style={{ textDecoration: "none", color: "inherit" }} */}
              {/* > */}
                <span className="name">{pet.name} </span>
              {/* </Link> */}
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{pet.description}</p>
          <img src={pet.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Pet;
