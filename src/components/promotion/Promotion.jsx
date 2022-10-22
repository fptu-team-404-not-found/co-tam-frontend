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


const getAPI = "https://cotam.azurewebsites.net/api/promotions";

export default function Promotion() {
  const [data, setData] = useState([]);

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
      renderCell: (params) => {
        const onClick = (e) => {
        };
  
        return (
          <EditIcon style={{ color: '#15BF81' }} onClick={onClick} defaultChecked/>
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
            pageIndex: 1,
            pageSize: 30,
          },
        })
        .then((res) => {
          setData(res.data.data);
        });
    };
    fetchData();
  }, [data]);


  return (
    <>
      <div className="promotion-container">
        <Navbar linkBtn="/createnewpromotion"/>
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
