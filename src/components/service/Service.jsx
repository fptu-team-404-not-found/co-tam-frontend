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
const getDataCount = "https://cotam.azurewebsites.net/api/services/count";

export default function Service() {
  const [data, setData] = useState([]);

  const [count, setCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

  const columns = [
    { field: "name", headerName: "Dịch vụ", width: 400 },
    { field: "description", headerName: "Mô tả", width: 330 },
    {
      field: "extraServices",
      headerName: "Dịch vụ nâng cao",
      width: 800,
      renderCell: (data) => {
        return data.value.length == 0 ? '-' : data.value
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
  });

  return (
    <>
      <div className="service-container">
        <Navbar styled={{ display: 'none' }} disabled='disabled' linkBtn="/createnewservice" />
        <Header title="Danh sách dịch vụ" />
        <div className="service-table-container">
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
