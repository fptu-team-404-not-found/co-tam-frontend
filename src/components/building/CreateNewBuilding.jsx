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
import "./CreateNewBuilding.scss";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import swal from "sweetalert";

const getAreaIdAPI = "https://cotam.azurewebsites.net/api/areas";

const getBuildingAPI = "https://cotam.azurewebsites.net/api/buildings";

export default function CreateNewBuilding() {
  const [data, setData] = useState([]);
  const [getId, setGetId] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const handleChangeAreaId = (event) => {
    setId(event.target.value);
  };


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(getAreaIdAPI, {
          params: {
            pageIndex: 1,
            pageSize: 40,
          },
        })
        .then((res) => {
          setData(res.data.data);
        });
    };
    fetchData();
  }, [data]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios
  //       .get(getAreaIdAPI+ `/${id}`)
  //       .then((res) => {
  //         console.log(res.data.data);
  //         setGetId(res.data.data);
  //       });
  //   };
  //   fetchData();
  // }, [getId]);

  // const postData = () => {
  //   axios
  //     .post(getAPI, {
  //       name,
  //       district,
  //       areaName,
  //       city,
  //     })
  //     .then((res) => {
  //       console.log(res)
  //       setName("");
  //       setDistrict("");
  //       setAreaName("");
  //       setCity("");
  //       swal("Good job!", res.data.message, "success");
  //       navigate(-1);
  //     });
  // };

  const postData = () => {
    console.log(name);
    console.log(district);
    console.log(id);
    console.log(city);
  };

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
          style={{ cursor: "pointer" }}
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
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="createNewBuilding-input"
              />
            </div>

            <div className="createNewBuilding-create-building-container">
              <span className="createNewBuilding-label">Tên Khu vực</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="createNewBuilding-input"
                disabled
              />
            </div>
          </div>
          <div className="createNewBuilding-create-building-container-right">
            <div className="createNewBuilding-create-building-container">
              <span className="createNewBuilding-label">Khu vực *</span>
              <Select
                labelId="createNewBuilding-input-area"
                id="createNewBuilding-select-area"
                className="createNewBuilding-select"
                value={id}
                onChange={handleChangeAreaId}
              >
                {data.map((res) => (
                  <MenuItem value={res.id}>{res.id}</MenuItem>
                ))}
              </Select>
            </div>
            <div className="createNewBuilding-create-building-container">
              <span className="createNewBuilding-label">Tỉnh/Thành phố</span>
              <input
                value={city}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="createNewBuilding-input"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="createNewBuilding-btn-container">
          <button onClick={postData} className="createNewBuilding-btn">
            Tạo
          </button>
          <button
            onClick={() => navigate(-1)}
            className="createNewBuilding-btn"
          >
            Hủy
          </button>
        </div>
      </FormControl>
    </>
  );
}
