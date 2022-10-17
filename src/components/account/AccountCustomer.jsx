import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Account.scss";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import HeaderHaveTab from "../HeaderHaveTab/HeaderHaveTab";
import { Button, Modal } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";

const getAPI = "https://cotam.azurewebsites.net/api/customers";

export default function AccountCustomer() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "name", headerName: "Họ tên", width: 400 },
    { field: "email", headerName: "Email", width: 400 },
    { field: "phone", headerName: "Số điện thoại", width: 240 },
    { field: "dateJoin", headerName: "Ngày tham gia", width: 360 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        const onClick = (e) => {
        };
  
        return (
          <Switch onClick={onClick} defaultChecked/>
        );
      }
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getAPI).then((res) => {
        setData(res.data.data);
      });
    };
    fetchData();
  }, [data]);


  return (
    <>
      <div className="account-container">
        <Navbar open={open} handleOpen={handleOpen} handleClose={handleClose}/>
        <HeaderHaveTab value="1" title="Danh sách tài khoản khách hàng" />
        <div className="account-table-container">
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
