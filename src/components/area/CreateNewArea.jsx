import {
  Box,
  Breadcrumbs,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./CreateNewArea.scss";
import EditIcon from "@mui/icons-material/Edit";

export default function CreateNewArea() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const navigate = useNavigate();

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/area"
      onClick={handleClick}
    >
      Danh sách khu vực
    </Link>,
    <Typography key="2" color="text.primary">
      Thêm khu vực mới
    </Typography>,
  ];

  function handleClick(event) {
    console.info("You clicked a breadcrumb.");
  }

  return (
    <>
      <Menu />
      <div className="createNewArea-container">
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          className="createNewArea-btn-back"
        />
        <Breadcrumbs
          className="createNewArea-breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <Header title="Thêm khu vực mới" />
      <FormControl id="createNewArea-form-container">
        <div className="createNewArea-create-area-container">
          <span className="createNewArea-label">Tên khu vực *</span>
          <Select
            labelId="createNewArea-input-area"
            id="createNewArea-select-area"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div className="createNewArea-create-area-container">
          <span className="createNewArea-label">Quận *</span>
          <Select
            labelId="createNewArea-input-district"
            id="createNewArea-select-district"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div className="createNewArea-btn-container">
          <button className="createNewArea-btn">Tạo</button>
          <button className="createNewArea-btn">Hủy</button>
        </div>
      </FormControl>
    </>
  );
}
