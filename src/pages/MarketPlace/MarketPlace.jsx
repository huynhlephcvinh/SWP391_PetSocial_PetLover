import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./marketplace.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Exchanges from '../../components/exchanges/Exchanges';
// import { CenterFocusStrong, Pets } from '@mui/icons-material';

const MarketPlace =  () => {
  const currentUser = localStorage.getItem('currentUser');
  const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState();
  const cruser = JSON.parse(localStorage.getItem('currentUser'));

  const [exchange, setExchange] = useState([]);

  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/exchange/getAllExchange", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setExchange(response.data);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div className="marketplace">

      <div className="marketplaceContainer">
        {exchange != "" ? (
          <Exchanges exchanges={exchange} />
        ) : (
          <div className='noPosts'>There's nothing here</div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
