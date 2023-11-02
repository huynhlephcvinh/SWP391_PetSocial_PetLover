import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./marketplace.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Exchanges from '../../components/exchanges/Exchanges';
import { Helmet } from 'react-helmet';
// import { CenterFocusStrong, Pets } from '@mui/icons-material';

const MarketPlace =  () => {
  const currentUser = localStorage.getItem('currentUser');
  const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState();
  const cruser = JSON.parse(localStorage.getItem('currentUser'));

  const [exchanges, setExchanges] = useState([]);

  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://103.253.147.216:8080/exchange/getAllExchange", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setExchanges(response.data);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div className="marketplace">
      <Helmet>
        <title>Market Place</title>
      </Helmet>
      <div className="marketplaceContainer">
        {exchanges != "" ? (
          <Exchanges exchanges={exchanges} setExchanges={setExchanges} />
        ) : (
          <div className='noPosts'>Nothing here</div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
