import Switch from "@mui/material/Switch";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import EditIcon from "@mui/icons-material/Edit";

const getAPI = "https://cotam.azurewebsites.net/api/orders";

export default function Order() {
  const [data, setData] = useState([]);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "dateTime", headerName: "Ngày", width: 300 },
    {
      field: "package",
      headerName: "Số lượng nhân viên",
      width: 300,
      renderCell: (data) => {
        return `${data.value.numberOfWorker} người`;
      },
    },
    {
      field: "paymentMethod",
      headerName: "Phương thức thanh toán",
      width: 300,
      renderCell: (data) => {
        return data.value.name;
      },
    },
    {
      field: "promotion",
      headerName: "Khuyến mãi",
      width: 300,
      renderCell: (data) => {
        return data.value === null ? 'Không sử dụng' : data.value
      },
    },
    {
        field: "total",
        headerName: "Tổng thanh toán",
        width: 300,
        renderCell: (data) => {
          return `${data.value} VNĐ`
        },
      },
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
