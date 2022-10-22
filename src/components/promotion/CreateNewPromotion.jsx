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
import axios from "axios";
import swal from "sweetalert";


const getAPI = "https://cotam.azurewebsites.net/api/promotions";

export default function CreateNewPromotion() {
  const [serviceSelected, setServiceSelected] = useState([]);
  const [paymentSelected, setPaymentSelected] = useState([]);
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(dayjs());

  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleChangeDatestart = (newValue) => {
    setStartDate(newValue);
  };

  const handleChangeDateEnd = (newValue) => {
    setEndDate(newValue);
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

  const postData = () => {
    if (endDate <= startDate) {
      swal("Nhập sai", "Ngày kết thúc phải lớn hơn ngày bắt đầu!", "error");
    }
    else if (code.trim() === '' || description.trim() === '') {
      swal("Nhập sai", "Bắt buộc nhập code!", "error");
    }
    else if (discount <= 0) {
      swal("Nhập sai", "Giảm giá không được bé hơn hoặc bằng 0", "error");
    }
    else {
      axios
      .post(getAPI, {
        code,
        description,
        startDate,
        endDate,
        discount,
        amount,
      })
      .then((res) => {
        console.log(res)
        setCode('');
        setDescription('');
        setEndDate(dayjs());
        setStartDate(dayjs());
        setDiscount(0);
        setAmount(0);
        swal("Good job!", res.data.message, "success");
        navigate(-1);
      });
    }
  };
  // const postData = () => {
  //   console.log(code);
  //   console.log(description);
  //   console.log(startDate);
  //   console.log(endDate);
  //   console.log(discount);
  //   console.log(amount);
  // };

  return (
    <>
      <Menu />
      <div className="createNewPromotion-container">
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer' }}
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
              <input value={code} onChange={e => setCode(e.target.value)} type="text" className="createNewPromotion-input" />
            </div>
          </div>
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Mô tả *</span>
              <input value={description} onChange={e => setDescription(e.target.value)} type="text" className="createNewPromotion-input" />
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
                  value={startDate}
                  onChange={handleChangeDatestart}
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
                  value={endDate}
                  onChange={handleChangeDateEnd}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="createNewPromotion-create-promotion-container-side">
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Giảm giá *</span>
              <input value={discount} onChange={e => setDiscount(e.target.value)} type="number" className="createNewPromotion-input" />
            </div>
          </div>
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Hóa đơn *</span>
              <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="createNewPromotion-input" />
            </div>
          </div>
        </div>
        <div className="createNewPromotion-btn-container">
          <button onClick={postData} className="createNewPromotion-btn">Tạo</button>
          <button onClick={() => navigate(-1)} className="createNewPromotion-btn">Hủy</button>
        </div>
      </FormControl>
    </>
  );
}
