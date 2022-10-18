import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Area.scss";

const getAPI = "https://cotam.azurewebsites.net/api/areas";

export default function Area() {
  const [data, setData] = useState([]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "name", headerName: "Tên khu vực", width: 480 },
    { field: "district", headerName: "Quận", width: 480 },
    { field: "city", headerName: "Tỉnh/Thành phố", width: 480 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        const onClick = (e) => {};

        return (
          <EditIcon
            style={{ color: "#15BF81" }}
            onClick={onClick}
            defaultChecked
          />
        );
      },
    },
    {
      field: "active",
      headerName: "",
      sortable: false,
      renderCell: (data) => {
        const onDelete = (id) => {
          axios.delete(getAPI + `/${id}`).then(() => {
            getData();
          });
        };
        return data.value === true ? (
          <Switch
            value={data.value}
            onClick={() => onDelete(data.id)}
            defaultChecked
          />
        ) : (
          <Switch value={data.value} onClick={() => onDelete(data.id)} />
        );
      },
    },
  ];

  const getData = useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(getAPI, {
          params: {
            pageIndex: 1,
            pageSize: 8,
          },
        })
        .then((res) => {
          console.log(res.data.data.length);
          setData(res.data.data);
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
