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
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./CreateNewArea.scss";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import swal from "sweetalert";

const getProvinceAPI = "https://provinces.open-api.vn/api/";
const getDistrictAPI =
  "https://api.mysupership.vn/v1/partner/areas/district?province=79";

const getAPI = "https://cotam.azurewebsites.net/api/areas";

export default function CreateNewArea() {
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [provinceArray, setProvinceArray] = useState([]);
  const [districtArray, setDistrictArray] = useState([]);
  const [name, setName] = useState('');

  const handleChangeDistrictResult = (event) => {
    setDistrict(event.target.value);
    console.log(event.target.value)
  };
  const handleChangeProvinceResult = (event) => {
    setCity(event.target.value);
    console.log(event.target.value)
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getProvinceAPI).then((res) => {
        console.log(res.data[49]);
        setProvinceArray(res.data[49].name);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getDistrictAPI).then((res) => {
        console.log(res.data.results);
        setDistrictArray(res.data.results);
      });
    };
    fetchData();
  }, []);

  const postData = () => {
    axios
      .post(getAPI, {
        name,
        district,
        city,
      })
      .then((res) => {
        console.log(res)
        setName("");
        setDistrict("");
        setCity("");
        swal("Good job!", res.data.message, "success");
        navigate(-1);
      });
  };


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
          style={{ cursor: "pointer" }}
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
          <input value={name} onChange={e => setName(e.target.value)} type="text" className="createNewArea-input-name" />
        </div>
        <div className="createNewArea-create-area-container">
          <span className="createNewArea-label">Quận *</span>
          {city !== "" ? (
            <Select
              labelId="createNewArea-input-district"
              id="createNewArea-select-district"
              value={district}
              onChange={handleChangeDistrictResult}
            >
              {districtArray.map((result) => (
                <MenuItem value={result.name}>{result.name}</MenuItem>
              ))}
            </Select>
          ) : (
            <Select
              disabled
              style={{backgroundColor: 'rgba(21, 191, 129, 0.1)'}}
              labelId="createNewArea-input-district"
              id="createNewArea-select-district"
              value={district}
              onChange={handleChangeDistrictResult}
            >
              {districtArray.map((result) => (
                <MenuItem value={result.name}>{result.name}</MenuItem>
              ))}
            </Select>
          )}
        </div>
        <div className="createNewArea-create-area-container">
          <span className="createNewArea-label">Tỉnh/thành phố *</span>
          <Select
            labelId="createNewArea-input-district"
            id="createNewArea-select-district"
            value={city}
            onChange={handleChangeProvinceResult}
          >
            {/* {province.map((item) => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))} */}
            <MenuItem value={provinceArray}>{provinceArray}</MenuItem>
          </Select>
        </div>
        <div className="createNewArea-btn-container">
          <button onClick={postData} className="createNewArea-btn">Tạo</button>
          <button onClick={() => navigate(-1)} className="createNewArea-btn">Hủy</button>
        </div>
      </FormControl>
    </>
  );
}
