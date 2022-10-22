import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Service.scss";
import swal from "sweetalert";

const getAPI = "https://cotam.azurewebsites.net/api/services";

export default function Service() {
  const [data, setData] = useState([]);

  const columns = [
    { field: "name", headerName: "Dịch vụ", width: 400 },
    { field: "price", headerName: "Giá", width: 330 },
    {
      field: "extraServices",
      headerName: "Dịch vụ nâng cao",
      width: 700,
      renderCell: (data) => {
        return data.value.length !== 0 ? '-' : data.value
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
    {
      field: "active",
      headerName: "",
      sortable: false,
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

        return data.value == 1 ? (
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
            pageSize: 20,
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
      <div className="service-container">
        <Navbar linkBtn="/createnewservice" />
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
