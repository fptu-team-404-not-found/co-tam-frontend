
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import NavbarManager from "../nav/NavbarManager";

const getAPI = "https://cotam.azurewebsites.net/api/orders";
const getDataCount = "https://cotam.azurewebsites.net/api/orders/count";

export default function Order(props) {
  const [data, setData] = useState([]);

  const [count, setCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(8);


  const columns = [
    { field: "dateTime", headerName: "Ngày", width: 360 },
    {
      field: "package",
      headerName: "Số giờ",
      width: 300,
      renderCell: (data) => {
        return data.value.duration + ' giờ';
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
        field: "total",
        headerName: "Tổng thanh toán",
        width: 300,
        renderCell: (data) => {
          return `${data.value} VNĐ`
        },
      },
      {
        field: "subTotal",
        headerName: "Phí phụ",
        width: 300,
        renderCell: (data) => {
          return `${data.value} VNĐ`
        },
      },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(getAPI, {
          params: {
            pageIndex: selectedPage + 1,
            pageSize: selectedPageSize,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setData(res.data.data);
        });
    };
    fetchData();
  }, [data, selectedPage, selectedPageSize]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(getDataCount)
        .then((res) => {
          console.log(res.data.data);
          setCount(res.data.data);
        });
    };
    fetchData();
  });

  return (
    <>
      <div className="area-container">
        <NavbarManager disabled='disabled' styled={{ display: 'none' }}/>
        <Header title="Danh sách đơn hàng" />
        <div className="area-table-container">
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={selectedPageSize}
            rowCount={count}
            pagination={true}
            paginationMode="server"
            page={selectedPage}
            onPageChange={(page) => {
              console.log("Current Page: ", page);
              setSelectedPage(page);
            }}
            onPageSizeChange={(pageSize) => {
              console.log("Current Page Size: ", pageSize);
              setSelectedPageSize(pageSize);
            }}
          />
        </div>
      </div>
    </>
  );
}
