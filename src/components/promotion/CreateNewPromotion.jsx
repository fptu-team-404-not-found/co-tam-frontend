import {
  Breadcrumbs,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./CreateNewPromotion.scss";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function CreateNewPromotion() {
  const [serviceSelected, setServiceSelected] = useState([]);
  const [paymentSelected, setPaymentSelected] = useState([]);
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(dayjs());

  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
  };

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

  const payments = ["Tiền mặt", "Ví"];

  const services = ["Dọn dẹp", "Khử trùng", "Sofa - Rèm cửa", "Thiết bị lạnh"];

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/promotion"
      onClick={handleClick}
    >
      Danh sách khuyến mãi
    </Link>,
    <Typography key="2" color="text.primary">
      Thêm khuyến mãi mới
    </Typography>,
  ];

  function handleClick(event) {
    console.info("You clicked a breadcrumb.");
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setServiceSelected(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangePayment = (event) => {
    const {
      target: { value },
    } = event;
    setPaymentSelected(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Menu />
      <div className="createNewPromotion-container">
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          className="createNewPromotion-btn-back"
        />
        <Breadcrumbs
          className="createNewPromotion-breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <Header title="Thêm khuyến mãi mới" />
      <FormControl id="createNewPromotion-form-container">
        <div className="createNewPromotion-create-promotion-container-side">
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Mã *</span>
              <input type="text" className="createNewPromotion-input" />
            </div>
          </div>
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Tên *</span>
              <input type="text" className="createNewPromotion-input" />
            </div>
          </div>
        </div>
        <div className="createNewPromotion-create-promotion-container-side">
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Ngày bắt đầu *</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  inputFormat="MM/DD/YYYY"
                  value={dateValue}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Ngày kết thúc *</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  inputFormat="MM/DD/YYYY"
                  value={dateValue}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="createNewPromotion-create-promotion-container-right">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Dịch vụ *</span>
              <FormControl sx={{ width: 300 }}>
                <Select
                  className="createNewPromotion-select"
                  multiple
                  value={serviceSelected}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {services.map((service) => (
                    <MenuItem key={service} value={service}>
                      <Checkbox
                        checked={serviceSelected.indexOf(service) > -1}
                      />
                      <ListItemText primary={service} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="createNewPromotion-create-promotion-container-side">
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Giảm giá *</span>
              <input type="number" className="createNewPromotion-input" />
            </div>
          </div>
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Hóa đơn *</span>
              <input type="number" className="createNewPromotion-input" />
            </div>
          </div>
          <div className="createNewPromotion-create-promotion-container-right">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">
                Phương thức thanh toán *
              </span>
              <FormControl sx={{ width: 300 }}>
                <Select
                  className="createNewPromotion-select"
                  multiple
                  value={paymentSelected}
                  onChange={handleChangePayment}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {payments.map((payment) => (
                    <MenuItem key={payment} value={payment}>
                      <Checkbox
                        checked={paymentSelected.indexOf(payment) > -1}
                      />
                      <ListItemText primary={payment} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="createNewPromotion-btn-container">
          <button className="createNewPromotion-btn">Tạo</button>
          <button className="createNewPromotion-btn">Hủy</button>
        </div>
      </FormControl>
    </>
  );
}
