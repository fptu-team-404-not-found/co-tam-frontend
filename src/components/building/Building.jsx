import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Building.scss";
import swal from "sweetalert";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

const getAPI = "https://cotam.azurewebsites.net/api/buildings";

export default function Building() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "name", headerName: "Tên tòa nhà", width: 360 },
    {
      field: "nameBuilding",
      headerName: "Khu vực",
      width: 360,
      renderCell: (data) => {
        return data.row.area.name;
      },
    },
    {
      field: "district",
      headerName: "Quận",
      width: 360,
      renderCell: (data) => {
        return data.row.area.district;
      },
    },
    {
      field: "city",
      headerName: "Thành phố",
      width: 360,
      renderCell: (data) => {
        return data.row.area.city;
      },
    },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      width: 80,
      renderCell: (data) => {
        const onClick = () => {
          axios.get(getAPI + `/${data.id}`).then((res) => navigate('/createnewbuilding', {state: { id: data.id }}));
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
            pageSize: 8,
          },
        })
        .then((res) => {
          // console.log(res.data.data[0].area.city);
          setData(res.data.data);
        });
    };
    fetchData();
  }, [data]);

  return (
    <>
      <div className="building-container">
        <Navbar linkBtn='/createnewbuilding'/>
        <Header title="Danh sách tòa nhà" />
        <div className="building-table-container">
          {data.length === 0 ? <CircularProgress /> : <DataGrid
            rows={data}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
          />}
        </div>
      </div>
    </>
  );
}
