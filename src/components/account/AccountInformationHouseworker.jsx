import { Breadcrumbs } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./AccountInformationHouseworker.scss";
import EditIcon from "@mui/icons-material/Edit";
import MenuManager from "../menu/MenuManager";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const getAPI = "https://cotam.azurewebsites.net/api/houseworkers";
const getTagAPI = "https://cotam.azurewebsites.net/api/worker-tag";
// const getCount = "https://cotam.azurewebsites.net/api/worker-tag/count";

export default function AccountInformationHouseworker() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState();

  const [workerTags, setWorkerTags] = useState("");
  const [workerTagsArray, setWorkerTagsArray] = useState([]);

  const handleChangeWorkerTag = (event) => {
    setWorkerTags(event.target.value);
  };

  useEffect(() => {
      const fetchData = () => {
        axios
          .get(getTagAPI + "/add", {
            params: {
              PageIndex: 1,
              PageSize: 10,
            },
          })
          .then((res) => {
            console.log(res.data.data);
            setWorkerTagsArray(res.data.data);
          });
      };
      fetchData();
  }, []);

  useEffect(() => {
    if (state !== null) {
      const fetchData = () => {
        axios.get(getAPI + `/${state.id}`).then((res) => {
          setAvatar(res.data.data.avatar);
          setName(res.data.data.name);
          setEmail(res.data.data.email);
          setPhone(res.data.data.phone);
          setWorkerTags(res.data.data.workerTags.map((item) => item.name));
        });
      };
      fetchData();
    }
  }, []);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/accounthouseworker"
      onClick={handleClick}
    >
      Danh sách tài khoản
    </Link>,
    <Typography key="2" color="text.primary">
      Thông tin tài khoản
    </Typography>,
  ];

  function handleClick(event) {
    console.info("You clicked a breadcrumb.");
  }

  const { state } = useLocation();

  const updateData = () => {
    postWorkerTag();
    putData();
  }

  const postWorkerTag = async () => {
    await axios
      .post(getTagAPI, {
        name: String(workerTags),
        houseWorkerId: state.id,
      })
      .then((res) => {
        console.log(res);
        swal("Good job!", res.data.message, "success");
        navigate(-1);
      });
  };

  const putData = async () => {
    await axios
      .put(
        getAPI,
        {
          id: state.id,
          name,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        swal("Good job!", res.data.message, "success");
        navigate(-1);
      });
  };

  return (
    <>
      <MenuManager styledAccount={{background: 'rgba(255, 255, 255, 0.5)'}}/>
      <div className="accountInformation-container">
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          className="accountInformation-btn-back"
        />
        <Breadcrumbs
          className="accountInformation-breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <Header title="Thông tin tài khoản" />
      <div>
        {/* <input
          type="file"
          value={avatar}
          onChange={(event) => {
            console.log(event.target.files[0]);
            setAvatar(event.target.files[0]);
          }}
        /> */}
        {avatar == null ? (
          <img
            className="accountInformation-img"
            src="https://png.pngtree.com/png-vector/20191130/ourmid/pngtree-hotel-maid-icon-circle-png-image_2059785.jpg"
          />
        ) : (
          <img className="accountInformation-img" src={avatar} alt="hi" />
        )}

        <table className="accountInformation-text-container">
          <tr>
            <th>Họ tên</th>
            <td>
              <input
                className="accountInfor-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              <input
                type="text"
                className="accountInfor-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Số điện thoại</th>
            <td>
              <input
                type="text"
                className="accountInfor-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Công việc</th>
            <td>
              <FormControl style={{ margin: "0", width: "90%" }} sx={{ m: 1 }}>
                <InputLabel id="demo-multiple-chip-label">Jobs</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  name="workerTag"
                  id="demo-multiple-chip"
                  value={workerTags}
                  onChange={handleChangeWorkerTag}
                >
                  {workerTagsArray.map((result) => (
                  <MenuItem value={result.name}>{result.name}</MenuItem>
              ))}
                </Select>
              </FormControl>
            </td>
          </tr>
          <button onClick={updateData} className="accountInfor-btn">
            Lưu
          </button>
        </table>
      </div>
    </>
  );
}
