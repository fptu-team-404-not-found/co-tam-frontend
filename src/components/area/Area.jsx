import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Area.scss";
import swal from "sweetalert";
import { useNavigate } from "react-router";

const getAPI = "https://cotam.azurewebsites.net/api/areas";

export default function Area() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "name", headerName: "Tên khu vực", width: 480 },
    { field: "district", headerName: "Quận", width: 480 },
    { field: "city", headerName: "Tỉnh/Thành phố", width: 480 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 60,
      renderCell: (data) => {
        const onClick = () => {
          axios.get(getAPI + `/${data.id}`).then((res) => navigate('/createnewarea', {state: { id: data.id }}));
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

  const getData = useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(getAPI, {
          params: {
            pageIndex: 1,
            pageSize: 40,
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
        <Navbar linkBtn="/createnewarea"/>
        <Header title="Danh sách khu vực" />
        <div className="area-table-container">
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={40}
            rowsPerPageOptions={[8]}
          />
        </div>
      </div>
    </>
  );
}
