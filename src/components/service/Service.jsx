import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from "../Header/Header";
import Navbar from "../nav/Navbar";
import "./Service.scss";


const getAPI = "https://cotam.azurewebsites.net/api/services";

export default function Service() {
  const [data, setData] = useState([]);

  const columns = [
    { field: "name", headerName: "Dịch vụ", width: 400 },
    { field: "price", headerName: "Giá", width: 330 },
    { field: "extraServices", headerName: "Dịch vụ nâng cao", width: 700 },
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
        setData(res.data.data);
        console.log(res.data)
      });
    };
    fetchData();
  }, []);


  return (
    <>
      <div className="service-container">
        <Navbar />
        <Header title="Danh sách dịch vụ" />
        <div className="service-table-container">
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
