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
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./CreateNewArea.scss";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import swal from "sweetalert";

const getDistrictAPI =
  "https://api.mysupership.vn/v1/partner/areas/district?province=79";

const getAPI = "https://cotam.azurewebsites.net/api/areas";

export default function CreateNewArea() {
  const [data, setData] = useState([]);
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("Thành phố Hồ Chí Minh");
  const [districtArray, setDistrictArray] = useState([]);
  const [name, setName] = useState("");

  const handleChangeDistrictResult = (event) => {
    setDistrict(event.target.value);
    console.log(event.target.value);
  };
  const handleChangeProvinceResult = (event) => {
    setCity(event.target.value);
    console.log(event.target.value);
  };

  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    if (state !== null) {
      const fetchData = () => {
        axios.get(getAPI + `/${state.id}`).then((res) => {
          setData(res.data.data);
          setName(res.data.data.name);
          setDistrict(res.data.data.district);
          setCity(res.data.data.city);
        });
      };
      fetchData();
    }
  }, []);

  const putData = () => {
    axios
      .put(getAPI + `/${state.id}`, {
        name,
        district,
        city,
        active: false
      })
      .then((res) => {
        console.log(res);
        swal("Good job!", res.data.message, "success");
        navigate(-1);
      });
  };

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
        console.log(res);
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
    data.length === 0 ? (
      <Typography key="2" color="text.primary">
        Thêm khu vực mới
      </Typography>
    ) : (
      <Typography key="2" color="text.primary">
        Chỉnh sửa khu vực
      </Typography>
    ),
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
      {data.length == 0 ? (
        <Header title="Thêm khu vực mới" />
      ) : (
        <Header title="Chỉnh sửa khu vực" />
      )}
      <FormControl id="createNewArea-form-container">
        <div className="createNewArea-create-area-container">
          <span className="createNewArea-label">Tên khu vực *</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="createNewArea-input-name"
          />
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
              style={{ backgroundColor: "rgba(21, 191, 129, 0.1)" }}
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
            disabled
            style={{
              backgroundColor: "rgba(21, 191, 129, 0.3)",
              fontWeight: "500",
            }}
          >
            <MenuItem value={city}>{city}</MenuItem>
          </Select>
        </div>
        <div className="createNewArea-btn-container">
        {data.length === 0 ? (
            <button onClick={postData} className="createNewArea-btn">
              Tạo
            </button>
          ) : (
            <button onClick={putData} className="createNewArea-btn">
              Cập nhật
            </button>
          )}
          <button onClick={() => navigate(-1)} className="createNewArea-btn">
            Hủy
          </button>
        </div>
      </FormControl>
    </>
  );
}
