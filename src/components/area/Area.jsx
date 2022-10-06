import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Area.scss";


const getAPI = "https://633d45207e19b178290a9dbc.mockapi.io/area";

export default function Area() {
  const [data, setData] = useState([]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "area", headerName: "Tên khu vực", width: 700 },
    { field: "district", headerName: "Quận", width: 700 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        const onClick = (e) => {
        };
  
        return (
          <EditIcon style={{ color: '#15BF81' }} onClick={onClick} defaultChecked/>
        );
      }
    },
    {
        field: "delete",
        headerName: "",
        sortable: false,
        renderCell: (params) => {
          const onClick = (e) => {
          };
    
          return (
            <DeleteIcon style={{ color: '#FB5C5C' }} onClick={onClick} defaultChecked/>
          );
        }
      },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getAPI).then((res) => {
        setData(res.data);
      });
    };
    fetchData();
  }, [data]);


  return (
    <>
      <div className="area-container">
        <Navbar />
        <Header title="Danh sách khu vực" />
        <div className="area-table-container">
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
          />
        </div>
      </div>
    </>
  );
}
