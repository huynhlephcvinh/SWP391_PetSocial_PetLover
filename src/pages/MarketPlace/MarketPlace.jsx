import React, { useEffect, useState } from "react";
import axios from "axios";
import "./marketplace.scss";
import Exchanges from "../../components/exchanges/Exchanges";
import { Helmet } from "react-helmet";
import SlideSwitch from "../../components/slideswitch/SlideSwitch";

const MarketPlace = () => {
  const currentUser = localStorage.getItem("currentUser");
  const cruser = JSON.parse(localStorage.getItem("currentUser"));

  const [exchanges, setExchanges] = useState([]);
  const [view, setView] = useState(false);

  const token = localStorage.getItem("token");

  const handleToggle = () => {
    setView(!view);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setExchanges([]);
        let response;
        if (!view) {
          response = await axios.get(
            "https://petsocial.azurewebsites.net/exchange/getAllExchange",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          setExchanges([]);
          response = await axios.get(
            "https://petsocial.azurewebsites.net/exchange/view-exchange",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        console.log(response.data);
        setExchanges(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchData();
  }, [view]);
  return (
    <div className="marketplace">
      <Helmet>
        <title>Market Place</title>
      </Helmet>
      <div className="marketplaceContainer">
        <SlideSwitch isChecked={view} onCheckedChange={handleToggle} />
        {exchanges != "" ? (
          <Exchanges
            exchanges={exchanges}
            setExchanges={setExchanges}
            view={view}
          />
        ) : (
          <div className="noPosts">Nothing here</div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
