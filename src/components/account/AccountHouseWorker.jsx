import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Account.scss";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import HeaderHaveTab from "../HeaderHaveTab/HeaderHaveTab";
import swal from "sweetalert";

const getAPI = "https://cotam.azurewebsites.net/api/houseworkers";
const getDataCount = "https://cotam.azurewebsites.net/api/houseworkers/count"; 

export default function AccountHouseWorker(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [selectedPage, setSelectedPage] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const columns = [
    { field: "name", headerName: "Họ tên", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
      renderCell: (data) => {
        return data.value != null ? data.value : "-";
      },
    },
    {
      field: "dateOfBirth",
      headerName: "Ngày sinh nhật",
      width: 300,
      renderCell: (data) => {
        return data.value != null ? data.value : "-";
      },
    },
    {
      field: "workerTags",
      headerName: "Công việc",
      width: 300,
      renderCell: (data) => {
        return data.value.length !== 0 ? data.value : ['-'];
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
          setCount(res.data.data);
        });
    };
    fetchData();
  }, [count]);

  return (
    <>
      <div className="account-container">
        <Navbar
          openModal2={open}
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
        <HeaderHaveTab value="0" title="Danh sách tài khoản nhân viên" />
        <div className="account-table-container">
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
