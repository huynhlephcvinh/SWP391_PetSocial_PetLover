import React, { useEffect, useState } from "react";
import axios from "axios";
import "./applied.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Applieds from "../../components/applieds/Applieds";
import { Helmet } from "react-helmet";

const MarketPlace = () => {
  const currentUser = localStorage.getItem("currentUser");
  const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState();
  const cruser = JSON.parse(localStorage.getItem("currentUser"));

  const [applieds, setApplieds] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://petsocial.azurewebsites.net/apply/view-applies",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setApplieds(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div className="applied">
      <Helmet>
        <title>Applied</title>
      </Helmet>
      <div className="appliedContainer">
        {applieds != "" ? (
          <Applieds applieds={applieds} setApplieds={setApplieds} />
        ) : (
          <div className="noPosts">Nothing here</div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
