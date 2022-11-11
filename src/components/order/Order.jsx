import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import NavbarManager from "../nav/NavbarManager";
import "./Order.scss";
import { FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box } from "@mui/system";
import swal from "sweetalert";
import { useNavigate } from "react-router";

const getAPI = "https://cotam.azurewebsites.net/api/orders";
const getDataCount = "https://cotam.azurewebsites.net/api/orders/count";

const getAssignAPI =
  "https://cotam.azurewebsites.net/api/houseworkers/houseworkers/assign";

const getPutAssign = "https://cotam.azurewebsites.net/api/work-in-order/assign";

const getHouseWorkerIdAPI =
  "https://cotam.azurewebsites.net/api/work-in-order/wio";

export default function Order(props) {
  const [data, setData] = useState([]);
  const [assignArray, setAssignArray] = useState([]);
  const [assignData, setAssignData] = useState([]);

  const [assignPerson, setAssignPerson] = useState("");
  const [people, setPeople] = useState("");

  const [count, setCount] = useState(0);
  const [id, setId] = useState("");
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigate = useNavigate();

  const handleChangePerson = (event) => {
    setAssignPerson(event.target.value);
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 80,
      renderCell: (data) => {
        return data.value;
      },
    },
    { field: "dateTime", headerName: "Ngày", width: 360 },
    {
      field: "package",
      headerName: "Số giờ",
      width: 160,
      renderCell: (data) => {
        return data.value.duration + " giờ";
      },
    },
    {
      field: "paymentMethod",
      headerName: "Phương thức thanh toán",
      width: 280,
      renderCell: (data) => {
        return data.value.name;
      },
    },
    {
      field: "total",
      headerName: "Tổng thanh toán",
      width: 280,
      renderCell: (data) => {
        return `${data.value} VNĐ`;
      },
    },
    {
      field: "subTotal",
      headerName: "Phụ phí",
      width: 240,
      renderCell: (item) => {
        return `${item.value} VNĐ`;
      },
    },
    {
      field: "orderState",
      headerName: "Giao việc",
      width: 200,
      renderCell: (item) => {
        const getAssign = () => {
          axios.get(getAssignAPI + `/${item.id}`).then((res) => {
            // console.log(res.data.data);
            setAssignData(res.data.data);
          });
          // setAssignArray(data);
        };
        const handleGetAssign = () => {
          setAssignArray(item.id);
          handleOpen();
          getAssign();
        };
        return (
          <>
            {item.value == 1 ? (
              <button className="order-assign" onClick={handleGetAssign}>
                Assign
              </button>
            ) : (
              "Đã giao việc"
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(getAPI, {
          params: {
            pageIndex: selectedPage + 1,
            pageSize: selectedPageSize,
          },
        })
        .then((res) => {
          // console.log(res.data.data.map(item => item.id));
          setId(res.data.data.map((item) => item.id));
          setData(res.data.data);
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

  const putData = () => {
    axios
      .put(getPutAssign + `/${assignArray}` + `/${assignPerson}`)
      .then((res) => {
        console.log(res.data.data);
        setPeople(res.data.data);
        // swal("Good job!", res.data.message, "success");
        window.location.reload();
      });
  };

  return (
    <>
      <div className="area-container">
        <NavbarManager disabled="disabled" styled={{ display: "none" }} />
        <Header title="Danh sách đơn hàng" />
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box id="navbar-modal-container" style={{ height: "472px" }}>
            <HighlightOffIcon
              onClick={handleClose}
              className="navbar-modal-close"
            />
            <div className="navbar-modal-border" style={{ height: "378px" }}>
              <h1 className="navbar-modal-heading">Giao việc cho nhân viên</h1>
              <div
                className="navbar-modal-input-container"
                style={{ marginTop: "42px" }}
              >
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-text"
                  style={{ fontWeight: "500" }}
                >
                  Chọn nhân viên
                </label>
                <FormControl style={{ width: "70%" }}>
                  {assignData !== null ? (
                    <Select
                      value={assignPerson}
                      onChange={handleChangePerson}
                      style={{
                        backgroundColor: "#FFF",
                        textAlign: "left",
                        color: "#000",
                      }}
                    >
                      {assignData.map((result) => (
                        <MenuItem value={result.id}>{result.name}</MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <>
                      <InputLabel style={{color: '#1b855e8c', fontWeight: '600'}} id="demo-simple-select-disabled-label">
                      Không còn nhân viên phù hợp
                      </InputLabel>
                      <Select
                        disabled
                        labelId="demo-simple-select-disabled-label"
                        placeholder="Không còn nhân viên phù hợp"
                        style={{
                          backgroundColor: "#e7dede",
                          textAlign: "left",
                          color: "#000",
                        }}
                      ></Select>
                    </>
                  )}
                </FormControl>
              </div>

              <button onClick={putData} className="navbar-modal-create">
                Giao việc
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
