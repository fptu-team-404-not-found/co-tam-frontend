import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Account.scss";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import HeaderHaveTab from "../HeaderHaveTab/HeaderHaveTab";
import { Alert, Button, Modal } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import swal from "sweetalert";

const getAPI = "https://cotam.azurewebsites.net/api/customers";

export default function AccountCustomer() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "name", headerName: "Họ tên", width: 400 },
    { field: "email", headerName: "Email", width: 400 },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 240,
      renderCell: (data) => {
        return data.value != null ? data.value : "-";
      },
    },
    {
      field: "dateOfBirth",
      headerName: "Ngày sinh nhật",
      width: 360,
      renderCell: (data) => {
        return data.value != null ? data.value : "-";
      },
    },
    {
      field: "active",
      headerName: "Action",
      sortable: false,
      width: 200,
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
            pageSize: 30,
          },
        })
        .then((res) => {
          setData(res.data.data);
        });
    };
    fetchData();
  }, [data]);

  const postData = () => {
    axios
      .post(getAPI, {
        name,
        email,
        phone,
      })
      .then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setOpen(false);
        swal("Good job!", res.data.message, "success");
      });
  };

  return (
    <>
      <div className="account-container">
        <Navbar
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          valueEmail={email}
          onChangeEmail={(e) => setEmail(e.target.value)}
          valuePhone={phone}
          onChangePhone={(e) => setPhone(e.target.value)}
          addClick={postData}
          valueName={name}
          onChangeName={(e) => setName(e.target.value)}
        />
        <HeaderHaveTab value="1" title="Danh sách tài khoản khách hàng" />
        <div className="account-table-container">
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[8]}
          />
        </div>
      </div>
    </>
  );
}
