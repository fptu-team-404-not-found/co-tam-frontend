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
      Danh s??ch khuy???n m??i
    </Link>,
    <Typography key="2" color="text.primary">
      Th??m khuy???n m??i m???i
    </Typography>,
  ];

  function handleClick(event) {
    console.info("You clicked a breadcrumb.");
  }

  const putData = () => {
    if (endDate <= startDate) {
      swal("Nh???p sai", "Ng??y k???t th??c ph???i l???n h??n ng??y b???t ?????u!", "error");
    } else if (code.trim() === "" || description.trim() === "") {
      swal("Nh???p sai", "B???t bu???c nh???p code!", "error");
    } else if (discount <= 0) {
      swal("Nh???p sai", "Gi???m gi?? kh??ng ???????c b?? h??n ho???c b???ng 0", "error");
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
      swal("Nh???p sai", "Ng??y k???t th??c ph???i l???n h??n ng??y b???t ?????u!", "error");
    } else if (code.trim() === "" || description.trim() === "") {
      swal("Nh???p sai", "B???t bu???c nh???p code!", "error");
    } else if (discount <= 0) {
      swal("Nh???p sai", "Gi???m gi?? kh??ng ???????c b?? h??n ho???c b???ng 0", "error");
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
      {data.length === 0 ? <Header title="Th??m khuy???n m??i m???i" /> : <Header title="Ch???nh s???a khuy???n m??i" /> }
      <FormControl id="createNewPromotion-form-container">
        <div className="createNewPromotion-create-promotion-container-side">
          <div className="createNewPromotion-create-promotion-container-left">
            <div className="createNewPromotion-create-promotion-container">
              <span className="createNewPromotion-label">M?? *</span>
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
              <span className="createNewPromotion-label">M?? t??? *</span>
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
              <span className="createNewPromotion-label">Ng??y b???t ?????u *</span>
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
              <span className="createNewPromotion-label">Ng??y k???t th??c *</span>
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
              <span className="createNewPromotion-label">Gi???m gi?? *</span>
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
              <span className="createNewPromotion-label">H??a ????n *</span>
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
              T???o
            </button>
          ) : (
            <button onClick={putData} className="createNewPromotion-btn">
              C???p nh???t
            </button>
          )}
          <button
            onClick={() => navigate(-1)}
            className="createNewPromotion-btn"
          >
            H???y
          </button>
        </div>
      </FormControl>
    </>
  );
}
