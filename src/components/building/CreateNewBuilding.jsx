import {
  Box,
  Breadcrumbs,
  FormControl,
  FormHelperText,
  InputLabel,
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
import "./CreateNewBuilding.scss";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import swal from "sweetalert";

const getAreaIdAPI = "https://cotam.azurewebsites.net/api/areas";

const getBuildingAPI = "https://cotam.azurewebsites.net/api/buildings";

export default function CreateNewBuilding() {
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [getId, setGetId] = useState([]);
  const [name, setName] = useState("");
  const [areaId, setAreaId] = useState("");

  const handleChangeAreaId = (event) => {
    setAreaId(event.target.value);
  };

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (state !== null) {
      const fetchData = async () => {
        await axios.get(getBuildingAPI + `/${state.id}`).then((res) => {
          console.log(res.data.data);
          setDataUpdate(res.data.data);
          setName(res.data.data.name);
          setAreaId(res.data.data.areaId);
        });
      };
      fetchData();
    }
  }, []);

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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(getAreaIdAPI + `/${areaId}`).then((res) => {
        setGetId(res.data.data);
      });
    };
    fetchData();
  }, [getId]);

  const postData = () => {
    axios
      .post(getBuildingAPI, {
        name,
        areaId,
      })
      .then((res) => {
        console.log(res);
        setName("");
        setGetId("");
        swal("Good job!", res.data.message, "success");
        navigate(-1);
      });
  };

  const putData = () => {
    axios
      .put(getBuildingAPI, {
        id: state.id,
        name,
        areaId,
      })
      .then((res) => {
        console.log(res);
        swal("Good job!", res.data.message, "success");
        navigate(-1);
      });
  };

  // const postData = () => {
  //   console.log(name);
  //   console.log(district);
  //   console.log(id);
  //   console.log(city);
  // };

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
      <Menu styledBuilding={{background: 'rgba(255, 255, 255, 0.5)'}} />
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
      {data.length === 0 ? <Header title="Thêm tòa nhà mới" /> : <Header title="Chỉnh sửa tòa nhà" /> }
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
                value={getId.name}
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
                value={areaId}
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
                value={getId.city}
                type="text"
                className="createNewBuilding-input"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="createNewBuilding-btn-container">
          {dataUpdate.length === 0 ? (
            <button onClick={postData} className="createNewBuilding-btn">
              Tạo
            </button>
          ) : (
            <button onClick={putData} className="createNewBuilding-btn">
              Cập nhật
            </button>
          )}
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
