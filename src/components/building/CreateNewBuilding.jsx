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
import "./CreateNewBuilding.scss";
import EditIcon from "@mui/icons-material/Edit";

export default function CreateNewBuilding() {
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
      to="/building"
      onClick={handleClick}
    >
      Danh sách tòa nhà
    </Link>,
    <Typography key="2" color="text.primary">
      Thêm tòa nhà mới
    </Typography>,
  ];

  function handleClick(event) {
    console.info("You clicked a breadcrumb.");
  }

  return (
    <>
      <Menu />
      <div className="createNewBuilding-container">
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          className="createNewBuilding-btn-back"
        />
        <Breadcrumbs
          className="createNewBuilding-breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <Header title="Thêm tòa nhà mới" />
      <FormControl id="createNewBuilding-form-container">
        <div className="createNewBuilding-create-building-container-side">
          <div className="createNewBuilding-create-building-container-left">
            <div className="createNewBuilding-create-building-container">
              <span className="createNewBuilding-label">Tên tòa nhà *</span>
              <input type="text" className="createNewBuilding-input" />
            </div>
            <div className="createNewBuilding-create-building-container">
              <span className="createNewBuilding-label">Số phòng *</span>
              <input type="text" className="createNewBuilding-input" />
            </div>
          </div>
          <div className="createNewBuilding-create-building-container-right">
            <div className="createNewBuilding-create-building-container">
              <span className="createNewBuilding-label">Tên khách hàng *</span>
              <input type="text" className="createNewBuilding-input" />
            </div>
            <div className="createNewBuilding-create-building-container">
              <span className="createNewBuilding-label">Số điện thoại *</span>
              <input type="number" className="createNewBuilding-input" />
            </div>
          </div>
        </div>
        <div className="createNewBuilding-btn-container">
          <button className="createNewBuilding-btn">Tạo</button>
          <button className="createNewBuilding-btn">Hủy</button>
        </div>
      </FormControl>
    </>
  );
}
