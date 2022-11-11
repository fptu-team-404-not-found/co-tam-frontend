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
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Menu from "../menu/Menu";
import "./Navbar.scss";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { NavLink } from "react-router-dom";
import Logout from "../logout/Logout";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";




export default function Navbar(props) {
  
  const [jobSelected, setJobSelected] = useState([]);
  const [value, setValue] = useState(dayjs(""));

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };

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

  return (
    <>
      <Menu />
      <Logout />
      <div className="navbar-container">
        <TextField
          className="navbar-search"
          label="Tìm kiếm"
          value={props.searchValue}
          onChange={props.onChangeSearch}
          type="search"
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
                    className="navbar-modal-input"
                    label="Sinh nhật"
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
          <Box id="navbar-modal-container" style={{height: '600px'}}>
            <HighlightOffIcon
              onClick={props.handleClose}
              className="navbar-modal-close"
            />
            <div className="navbar-modal-border" style={{height: '508px'}}>
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
          open={props.openModal2}
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
                    label="Sinh nhật"
                    className="navbar-modal-input"
                    inputFormat="MM/DD/YYYY"
                    value={props.valueDate}
                    onChange={props.onChangeDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              {/* <div className="navbar-modal-input-container">
                <label
                  className="navbar-modal-label"
                  htmlFor="navbar-modal-select"
                >
                  Công việc
                </label>
                <FormControl>
                  <Select
                    className="navbar-modal-select"
                    multiple
                    value={jobSelected}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {jobs.map((job) => (
                      <MenuItem key={job} value={job}>
                        <Checkbox checked={jobSelected.indexOf(job) > -1} />
                        <ListItemText primary={job} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div> */}
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
