import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Building.scss";


const getAPI = "https://633cfec07e19b17829057a5a.mockapi.io/account/building";

export default function Building() {
  const [data, setData] = useState([]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "name", headerName: "Tên tòa nhà", width: 360 },
    { field: "room", headerName: "Số phòng", width: 360 },
    { field: "customerName", headerName: "Tên khách hàng", width: 360 },
    { field: "phone", headerName: "Số điện thoại", width: 360 },
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
      <div className="building-container">
        <Navbar />
        <Header title="Danh sách tòa nhà" />
        <div className="building-table-container">
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
