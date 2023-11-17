import React from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token");

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handlePayment = () => {
    const data = {
      price: price,
      description: content,
    };

    axios
      .post(`https://petsocial.azurewebsites.net/paypal/pay`, data)
      .then((response) => {
        const approvalUrl = response.data;

        if (approvalUrl) {
          // Open the PayPal Payment Link in a new window
          window.open(approvalUrl, "_blank");
          toast.success("Payment link opened successfully!");
        } else {
          // window.alert("Failed to retrieve PayPal Payment Link.");
          toast.error("Failed to retrieve PayPal Payment Link.");
        }
      })
      .catch((error) => {
        console.error(error);
        // window.alert("Error during payment. Please try again.");
        toast.error("Error during payment. Please try again.");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Payment
          </Typography>
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={handlePriceChange}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            value={content}
            onChange={handleContentChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePayment}
          >
            Recharge
          </Button>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Payment;
