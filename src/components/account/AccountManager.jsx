import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Account.scss";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import HeaderHaveTab from "../HeaderHaveTab/HeaderHaveTab";
import { Button, Modal } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import swal from "sweetalert";

const getAPI = "https://cotam.azurewebsites.net/api/managers";
const getDataCount = "https://cotam.azurewebsites.net/api/managers/count";

export default function AccountManager() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const [dataFilter, setDataFilter] = useState([]);

  const [selectedPage, setSelectedPage] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

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
              axios
                .delete(getAPI + `/${id}`, {
                  headers: {
                    Authorization: `bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                })
                .then(() => {});
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
      .post(
        getAPI,
        {
          name,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
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
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
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
        .get(getDataCount, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setCount(res.data.data);
        });
    };
    fetchData();
  });

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(getAPI + `/search/${search}`, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            pageIndex: selectedPage + 1,
            pageSize: selectedPageSize,
          },
        })
        .then((res) => {
          console.log(res);
          setDataFilter(res.data.data)
        });
    };
    fetchData();
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(getAPI + `/search/count/${search}`, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setSearchCount(res.data.data);
        });
    };
    fetchData();
  });

  console.log(dataFilter);

  return (
    <>
      <div className="account-container">
        <Navbar
          openModal1={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          valueEmail={email}
          onChangeEmail={(e) => setEmail(e.target.value)}
          valuePhone={phone}
          onChangePhone={(e) => setPhone(e.target.value)}
          addClick={postData}
          valueName={name}
          onChangeName={(e) => setName(e.target.value)}
          searchValue={search}
          onChangeSearch={(e) => setSearch(e.target.value)}
        />
        <Header title="Danh sách tài khoản quản lý" />
        <div className="account-table-container">
          <DataGrid
            rows={search == '' ? data : dataFilter}
            columns={columns}
            pageSize={selectedPageSize}
            rowCount={search == '' ? count : searchCount}
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
