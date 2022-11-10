import {
  Breadcrumbs,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

export default function CreateNewPromotion(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);

  const { state } = useLocation();

  const handleChangeDatestart = (newValue) => {
    setStartDate(newValue);
  };

  const handleChangeDateEnd = (newValue) => {
    setEndDate(newValue);
  };

  useEffect(() => {
    if (state !== null) {
      const fetchData = () => {
        axios.get(getAPI + `/${state.id}`).then((res) => {
          console.log(res.data.data);
          setData(res.data.data);
          setCode(res.data.data.code);
          setDescription(res.data.data.description);
          setStartDate(res.data.data.startDate);
          setEndDate(res.data.data.endDate);
          setDiscount(res.data.data.discount);
          setAmount(res.data.data.amount);
        });
      };
      fetchData();
    }
  }, []);

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

  const putData = () => {
    if (endDate <= startDate) {
      swal("Nhập sai", "Ngày kết thúc phải lớn hơn ngày bắt đầu!", "error");
    } else if (code.trim() === "" || description.trim() === "") {
      swal("Nhập sai", "Bắt buộc nhập code!", "error");
    } else if (discount <= 0) {
      swal("Nhập sai", "Giảm giá không được bé hơn hoặc bằng 0", "error");
    } else {
      axios
        .put(getAPI  + `/${state.id}`, {
          code,
          description,
          startDate,
          endDate,
          discount,
          amount,
          active: false,
        })
        .then((res) => {
          console.log(res);
          swal("Good job!", res.data.message, "success");
          navigate(-1);
        });
      }
  };

  const postData = () => {
    if (endDate <= startDate) {
      swal("Nhập sai", "Ngày kết thúc phải lớn hơn ngày bắt đầu!", "error");
    } else if (code.trim() === "" || description.trim() === "") {
      swal("Nhập sai", "Bắt buộc nhập code!", "error");
    } else if (discount <= 0) {
      swal("Nhập sai", "Giảm giá không được bé hơn hoặc bằng 0", "error");
    } else {
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
          console.log(res);
          setCode("");
          setDescription("");
          setEndDate(dayjs());
          setStartDate(dayjs());
          setDiscount(0);
          setAmount(0);
          swal("Good job!", res.data.message, "success");
          navigate(-1);
        });
    }
  };

  

  return (
    <>
      <Menu styledPromotion={{background: 'rgba(255, 255, 255, 0.5)'}}/>
      <div className="createNewPromotion-container">
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
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
      {data.length === 0 ? <Header title="Thêm khuyến mãi mới" /> : <Header title="Chỉnh sửa khuyến mãi" /> }
      <FormControl id="createNewPromotion-form-container">
        <div className="createNewPromotion-create-promotion-container-side">
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Mã *</span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                className="createNewPromotion-input"
              />
            </div>
          </div>
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Mô tả *</span>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="createNewPromotion-input"
              />
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
              <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                type="number"
                className="createNewPromotion-input"
              />
            </div>
          </div>
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">Hóa đơn *</span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="createNewPromotion-input"
              />
            </div>
          </div>
        </div>
        <div className="createNewPromotion-btn-container">
          {data.length === 0 ? (
            <button onClick={postData} className="createNewPromotion-btn">
              Tạo
            </button>
          ) : (
            <button onClick={putData} className="createNewPromotion-btn">
              Cập nhật
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="createNewPromotion-btn"
          >
            Hủy
          </button>
        </div>
      </FormControl>
    </>
  );
}
