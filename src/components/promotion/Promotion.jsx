import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Promotion.scss";
import swal from "sweetalert";
import { useNavigate } from "react-router";


const getAPI = "https://cotam.azurewebsites.net/api/promotions";
const getDataCount = "https://cotam.azurewebsites.net/api/promotions/count";

export default function Promotion(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "code", headerName: "Mã", width: 200 },
    { field: "description", headerName: "Mô tả", width: 300 },
    { field: "startDate", headerName: "Ngày hiệu lực", width: 280 },
    { field: "endDate", headerName: "Ngày kết thúc", width: 280 },
    { field: "discount", headerName: "Giảm giá", width: 200 },
    { field: "amount", headerName: "Hóa đơn áp dụng", width: 240 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (data) => {
        const onClick = () => {
          axios.get(getAPI + `/${data.id}`).then((res) => navigate('/createnewpromotion', {state: { id: data.id }}));
        };
  
        return (
          <EditIcon style={{ color: '#15BF81', cursor: 'pointer' }} onClick={onClick} defaultChecked/>
        );
      }
    },
    {
      field: "active",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (data) => {
        const onDelete = (id) => {
          swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              axios.delete(getAPI + `/${id}`).then(() => {});
              swal("Success", {
                icon: "success",
              });
            } else {
              swal("Cancel", {
                icon: "error",
              });
              setData(data);
            }
          });
        };

        return data.value ? (
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
  }, [count]);
  
  return (
    <>
      <div className="promotion-container">
        <Navbar linkBtn="/createnewpromotion"/>
        <Header title="Danh sách khuyến mãi" />
        <div className="promotion-table-container">
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
