import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/admin/Header";

const Posts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // Gọi API để lấy danh sách bài đăng từ phía backend
      axios
        .get("http://localhost:8080/admin/getAllPost", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Lấy dữ liệu từ response và cập nhật vào `rows`
          console.log(response.data.data);
          const postData = response.data.data;
          const updatedRows = Array.isArray(postData)
            ? postData.map((post, index) => ({
                id: index + 1,
                name: post.user_name,
                content: post.content,
                date: formatDate(post.create_date),
                image: post.image,
                like: post.total_like,
                comment: post.total_comment,
              }))
            : [];

          setRows(updatedRows);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  const formatDate = (dateString) => {
    // Split the date string by a common set of date separators
    const dateComponents = dateString.split(/[/\- ]/);

    // Reorder the components to match the standard format: YYYY-MM-DD
    const formattedDate = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`;

    return formattedDate;
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "User",
      flex: 0.5,
    },
    {
      field: "content",
      headerName: "Content",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      valueGetter: (params) => {
        return new Date(params.value);
      },
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
    },
    {
      field: "like",
      headerName: "Like",
    },
    {
      field: "comment",
      headerName: "Comment",
    },
  ];

  return (
    <Box m="20px">
      <Header title="POSTS" subtitle="List of User Posts" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          // Tùy chỉnh giao diện của DataGrid theo nhu cầu của bạn
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

export default Posts;
