import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/admin/Header";
import { tokens } from "../../../theme";

const PetsUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // Fetch a list of pets from the backend
      axios
        .get("http://localhost:8080/admin/getAllPet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          const petData = response.data.data;
          const updatedRows = Array.isArray(petData)
            ? petData.map((pet, index) => ({
                id: index + 1,
                user: pet.user_name,
                name: pet.name,
                description: pet.description,
                image: pet.image,
                pet_type: pet.petType_name,
                status: pet.status,
                // Add more fields as needed
              }))
            : [];

          setRows(updatedRows);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "user",
      headerName: "User",
      flex: 0.5,
    },
    {
      field: "pet_type",
      headerName: "Pet Type",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "image",
      headerName: "Image",
    },

    {
      field: "status",
      headerName: "Status",
    },
    // Add more fields as needed
  ];

  return (
    <Box m="20px">
      <Header title="PETS" subtitle="List of Pets" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default PetsUser;
