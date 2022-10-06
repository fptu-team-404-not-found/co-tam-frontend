import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Promotion.scss";


const getAPI = "https://633cfec07e19b17829057a5a.mockapi.io/account/promotion";

export default function Promotion() {
  const [data, setData] = useState([]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "code", headerName: "Dịch vụ", width: 240 },
    { field: "name", headerName: "Giá", width: 240 },
    { field: "dateApprove", headerName: "Ngày hiệu lực", width: 240 },
    { field: "serviceApprove", headerName: "Dịch vụ áp dụng", width: 240 },
    { field: "discount", headerName: "Giảm giá", width: 240 },
    { field: "receipt", headerName: "Hóa đơn áp dụng", width: 240 },
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
      <div className="promotion-container">
        <Navbar />
        <Header title="Danh sách khuyến mãi" />
        <div className="promotion-table-container">
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
