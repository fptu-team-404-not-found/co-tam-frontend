import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../Header/Header";
import Navbar from "../nav/Navbar";
import "./Account.scss";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import HeaderHaveTab from "../HeaderHaveTab/HeaderHaveTab";

const getAPI = "https://633cfec07e19b17829057a5a.mockapi.io/account/account";

export default function AccountHouseWorker() {
  const [data, setData] = useState([]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "name", headerName: "Họ tên", width: 330 },
    { field: "email", headerName: "Email", width: 330 },
    { field: "phone", headerName: "Số điện thoại", width: 240 },
    { field: "dateJoin", headerName: "Ngày tham gia", width: 240 },
    { field: "rating", headerName: "Đánh giá", width: 240 },
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
        setData(res.data);
      });
    };
    fetchData();
  }, [data]);


  return (
    <>
      <div className="account-container">
        <Navbar />
        <HeaderHaveTab title="Danh sách tài khoản" />
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