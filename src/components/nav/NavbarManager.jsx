import { Search } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  InputAdornment,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Menu from "../menu/Menu";
import "./Navbar.scss";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { NavLink } from "react-router-dom";
import MenuManager from "../menu/MenuManager";
import Logout from "../logout/Logout";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

const getAPI = "https://cotam.azurewebsites.net/api/areas";
const getDataCount = "https://cotam.azurewebsites.net/api/areas/count";

export default function NavbarManager(props) {
  const [jobSelected, setJobSelected] = useState([]);
  const [data, setData] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [count, setCount] = useState(0);

  const jobs = [
    "Dọn dẹp vệ sinh",
    "Khử trùng",
    "Thiết bị lạnh",
    "Rèm cửa - Sofa",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobSelected(typeof value === "string" ? value.split(",") : value);
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
          console.log(res.data.data.length);
          setData(res.data.data);
        });
    };
    fetchData();
  }, [data, selectedPage, selectedPageSize]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getDataCount).then((res) => {
        console.log(res.data.data);
        setCount(res.data.data);
      });
    };
    fetchData();
  });

  return (
    <>
      <MenuManager />
      <Logout />
      <div className="navbar-container">
        <TextField
          className="navbar-search"
          label="Tìm kiếm"
          type="search"
          value={props.searchValue}
          onChange={props.onChangeSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Button
          onClick={props.handleOpen}
          startIcon={<AddIcon />}
          id="navbar-add-btn"
          LinkComponent={NavLink}
          to={props.linkBtn}
          disabled={props.disabled}
          style={props.styled}
        >
          Thêm
        </Button>
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box id="navbar-modal-container">
            <HighlightOffIcon
              onClick={props.handleClose}
              className="navbar-modal-close"
            />
            <div className="navbar-modal-border">
              <h1 className="navbar-modal-heading">Thêm mới tài khoản</h1>
              <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-text"
                >
                  Nhập tên
                </label>
                <input
                  value={props.valueName}
                  onChange={props.onChangeName}
                  className="navbar-modal-input"
                  id="navbar-modal-text"
                  type="text"
                />
              </div>
              <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-email"
                >
                  Nhập Email
                </label>
                <input
                  value={props.valueEmail}
                  onChange={props.onChangeEmail}
                  className="navbar-modal-input"
                  id="navbar-modal-email"
                  type="email"
                />
              </div>
              <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-phone"
                >
                  Số điện thoại
                </label>
                <input
                  value={props.valuePhone}
                  onChange={props.onChangePhone}
                  className="navbar-modal-input"
                  id="navbar-modal-phone"
                  type="text"
                />
              </div>
              <div
                style={{ marginTop: "24px" }}
                className="navbar-modal-input-container"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <label
                    className="navbar-modal-label"
                    htmlFor="navbar-modal-phone"
                  >
                    Ngày sinh
                  </label>
                  <DesktopDatePicker
                    label="Sinh nhật"
                    className="navbar-modal-input"
                    inputFormat="MM/DD/YYYY"
                    value={props.valueDate}
                    onChange={props.onChangeDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <button onClick={props.addClick} className="navbar-modal-create">
                TẠO MỚI
              </button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={props.openModal1}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box id="navbar-modal-container">
            <HighlightOffIcon
              onClick={props.handleClose}
              className="navbar-modal-close"
            />
            <div className="navbar-modal-border">
              <h1 className="navbar-modal-heading">Thêm mới tài khoản</h1>
              <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-text"
                >
                  Nhập tên
                </label>
                <input
                  value={props.valueName}
                  onChange={props.onChangeName}
                  className="navbar-modal-input"
                  id="navbar-modal-text"
                  type="text"
                />
              </div>
              <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-email"
                >
                  Nhập Email
                </label>
                <input
                  value={props.valueEmail}
                  onChange={props.onChangeEmail}
                  className="navbar-modal-input"
                  id="navbar-modal-email"
                  type="email"
                />
              </div>
              <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-phone"
                >
                  Số điện thoại
                </label>
                <input
                  value={props.valuePhone}
                  onChange={props.onChangePhone}
                  className="navbar-modal-input"
                  id="navbar-modal-phone"
                  type="text"
                />
              </div>
              <div
                style={{ marginTop: "24px" }}
                className="navbar-modal-input-container"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <label
                    className="navbar-modal-label"
                    htmlFor="navbar-modal-phone"
                  >
                    Ngày sinh
                  </label>
                  <DesktopDatePicker
                    className="navbar-modal-input"
                    inputFormat="MM/DD/YYYY"
                    value={props.valueDate}
                    onChange={props.onChangeDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <button onClick={props.addClick} className="navbar-modal-create">
                TẠO MỚI
              </button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={props.openModal2}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box id="navbar-modal-container" style={{ height: "660px" }}>
            <HighlightOffIcon
              onClick={props.handleClose}
              className="navbar-modal-close"
            />
            <div className="navbar-modal-border" style={{ height: "560px" }}>
              <h1 className="navbar-modal-heading">Thêm mới tài khoản</h1>
              <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-text"
                >
                  Nhập tên
                </label>
                <input
                  value={props.valueName}
                  onChange={props.onChangeName}
                  className="navbar-modal-input"
                  id="navbar-modal-text"
                  type="text"
                />
              </div>
              <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-email"
                >
                  Nhập Email
                </label>
                <input
                  className="navbar-modal-input"
                  id="navbar-modal-email"
                  type="email"
                  value={props.valueEmail}
                  onChange={props.onChangeEmail}
                />
              </div>
              <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-phone"
                >
                  Số điện thoại
                </label>
                <input
                  className="navbar-modal-input"
                  id="navbar-modal-phone"
                  type="text"
                  value={props.valuePhone}
                  onChange={props.onChangePhone}
                />
              </div>
              <div
                style={{ marginTop: "24px" }}
                className="navbar-modal-input-container"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <label
                    className="navbar-modal-label"
                    htmlFor="navbar-modal-phone"
                  >
                    Ngày sinh
                  </label>
                  <DesktopDatePicker
                    className="navbar-modal-input"
                    inputFormat="MM/DD/YYYY"
                    value={props.valueDate}
                    onChange={props.onChangeDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div
                style={{ marginTop: "16px"}}
                className="navbar-modal-input-container"
              >
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-phone"
                >
                  Khu vực
                </label>
                <Select
                  style={{
                    backgroundColor: "#FFF",
                    textAlign: "left",
                    color: "#15BF81",
                  }}
                  className="navbar-modal-input"
                  value={props.area}
                  onChange={props.handleChangeArea}
                >
                  {data.map((result) => (
                    <MenuItem
                      style={{
                        backgroundColor: "#FFF",
                        textAlign: "left",
                        color: "#15BF81",
                      }}
                      value={result.id}
                    >
                      {result.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <button onClick={props.addClick} className="navbar-modal-create">
                TẠO MỚI
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
