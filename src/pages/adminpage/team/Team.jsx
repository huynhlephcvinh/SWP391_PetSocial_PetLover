import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/admin/Header";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // Gọi API để lấy dữ liệu từ phía backend
      axios
        .get("http://103.253.147.216:8080/admin/getAllUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          //console.log(response.data.data);
          // Lấy dữ liệu từ response và cập nhật vào `rows`
          const userData = response.data.data;
          const updatedRows = Array.isArray(userData)
            ? userData.map((user, index) => ({
                id: index + 1,
                name: user.name,
                email: user.email,
                phone: user.phone,
                enable: user.enable,
                accessLevel: user.role,
              }))
            : [];

          setRows(updatedRows);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  useEffect(() => {
    // This will log rows every time it changes
    console.log(rows);
  }, [rows]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 0.8,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.6,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "enable",
      headerName: "Enable",
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 0.7,
      renderCell: ({ row: { accessLevel } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              accessLevel === "ROLE_ADMIN"
                ? colors.greenAccent[600]
                : accessLevel === "ROLE_STAFF"
                ? colors.blueAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {/* {accessLevel === "ROLE_ADMIN" && <AdminPanelSettingsOutlinedIcon />} */}
            {accessLevel === "ROLE_STAFF" && <SecurityOutlinedIcon />}
            {accessLevel === "ROLE_USER" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {accessLevel}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
