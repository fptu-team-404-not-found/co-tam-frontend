import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Account.scss";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import HeaderHaveTab from "../HeaderHaveTab/HeaderHaveTab";
import swal from "sweetalert";
import NavbarManager from "../nav/NavbarManager";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import Logout from "../logout/Logout";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

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
  const [dateOfBirth, setDateOfBirth] = useState(dayjs(''));
  const [search, setSearch] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const [searchCount, setSearchCount] = useState(0);

  const [area, setArea] = useState('');

  const label = { inputProps: { "aria-label": "Switch demo" } };

  let navigate = useNavigate();

  const handleChangeData = (event) => {
    setArea(event.target.value);
  };

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
      field: "areaId",
      headerName: "Khu vực",
      width: 160,
      renderCell: (data) => {
        return data.value != null ? data.value : "-";
      },
    },
    {
      field: "workerTags",
      headerName: "Công việc",
      width: 300,
      renderCell: (data) => {
        console.log(data.value.map((item) => item.name));
        // return data.value[0] != null ? data.value.map((item) => item.name + ' ') : "-";
        return data.value[0] != null ? data.value.map((item) => item.name + '. ') : "-";
      },
    },
    {
      field: "id",
      headerName: "",
      sortable: false,
      width: 80,
      renderCell: (data) => {
        const onClick = () => {
          axios
            .get(getAPI + `/${data.id}`)
            .then((res) =>
              navigate("/accountinformation", { state: { id: data.id } })
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
      headerName: "Action",
      sortable: false,
      width: 120,
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

  const handleChangeDate = (newValue) => {
    setDateOfBirth(newValue);
  };

  const postData = () => {
    axios
      .post(
        getAPI,
        {
          name,
          email,
          phone,
          dateOfBirth,
          areaId: area
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
        setDateOfBirth("");
        setArea("");
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
          console.log(res.data.data);
        });
    };
    fetchData();
  }, [data, selectedPage, selectedPageSize]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getDataCount).then((res) => {
        setCount(res.data.data);
      });
    };
    fetchData();
  });

  const getID = (id) => {
    console.log(id);
  };

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
          setDataFilter(res.data.data);
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

  return (
    <>
      <div className="account-container">
        <NavbarManager
          openModal2={open}
          handleOpen={handleOpen}
          onRowClick={getID}
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
          valueDate={dateOfBirth}
          onChangeDate={handleChangeDate}
          area={area}
          handleChangeArea={handleChangeData}
        />
        <HeaderHaveTab value={2} title="Danh sách tài khoản nhân viên" />
        <div className="account-table-container">
          <DataGrid
            rows={search == "" ? data : dataFilter}
            columns={columns}
            pageSize={selectedPageSize}
            rowCount={search == "" ? count : searchCount}
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
