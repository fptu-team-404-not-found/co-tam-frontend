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
import { useSearchParams } from "react-router-dom";

const getAPI = "https://cotam.azurewebsites.net/api/areas";
const getDataCount = "https://cotam.azurewebsites.net/api/areas/count";

export default function Area() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

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
          axios
            .get(getAPI + `/${data.id}`)
            .then((res) =>
              navigate("/createnewarea", { state: { id: data.id } })
            );
        };

        return (
          <EditIcon
            style={{ color: "#15BF81", cursor: "pointer" }}
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
            pageIndex: selectedPage + 1,
            pageSize: selectedPageSize,
          },
        })
        .then((res) => {
          console.log(res.data.data.length);
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
      <div className="area-container">
        <Navbar linkBtn="/createnewarea" />
        <Header title="Danh sách khu vực" />
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
