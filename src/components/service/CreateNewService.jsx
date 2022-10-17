import {
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
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
import "./CreateNewService.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddIcon from "@mui/icons-material/Add";

export default function CreateNewService() {
  const [time, setTime] = useState("1");
  const [person, setPerson] = useState("4");
  const navigate = useNavigate();

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const handleChangePerson = (event) => {
    setPerson(event.target.value);
  };
  
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/service"
      onClick={handleClick}
    >
      Danh sách dịch vụ
    </Link>,
    <Typography key="2" color="text.primary">
      Thêm dịch vụ mới
    </Typography>,
  ];

  function handleClick(event) {
    console.info("You clicked a breadcrumb.");
  }

  return (
    <>
      <Menu />
      <div className="createNewService-container">
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          className="createNewService-btn-back"
        />
        <Breadcrumbs
          className="createNewService-breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <Header title="Thêm dịch vụ mới" />
      <FormControl id="createNewService-form-container">
        <div className="createNewService-container-side">
          <div className="createNewService-create-service-container-side">
            <div className="createNewService-create-service-container-left">
              <div className="createNewService-create-service-container">
                <span className="createNewService-label">Tên dịch vụ *</span>
                <input type="text" className="createNewService-input" />
              </div>
            </div>
          </div>
          <div className="createNewService-create-service-container-side">
            <div className="createNewService-create-service-container-createExtraService">
              <span className="createNewService-label">Dịch vụ nâng cao</span>
              <Card sx={{ minWidth: 362 }}>
                <CardActions>
                  <HighlightOffIcon className="createNewService-btn-close" />
                </CardActions>
                <CardContent>
                  <div className="createNewService-package-container-all">
                    <div className="createNewService-package-container">
                      <label
                        className="createNewService-package-label"
                        htmlFor="createNewService-extraService-name"
                      >
                        Tên gói
                      </label>
                      <input
                        className="createNewService-package-input"
                        placeholder="Gói cơ bản,..."
                        id="createNewService-extraService-name"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        className="createNewService-package-label"
                        htmlFor="createNewService-extraService-price"
                      >
                        Giá gói
                      </label>
                      <input
                        className="createNewService-package-input"
                        placeholder="50.000, 60.000,..."
                        id="createNewService-extraService-price"
                        type="number"
                      />
                    </div>
                    <div>
                      <label
                        className="createNewService-package-label"
                        htmlFor="createNewService-extraService-description"
                      >
                        Miêu tả
                      </label>
                      <textarea
                        className="createNewService-package-textarea"
                        placeholder="50.000, 60.000,..."
                        id="createNewService-extraService-description"
                        type="number"
                      />
                    </div>
                    <Button className="createNewService-package-btn-save">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button
              startIcon={<AddIcon />}
              className="createNewService-btn-add-extraService"
            >
              Thêm
            </Button>
          </div>
        </div>
        <div className="createNewService-container-side">
          <div className="createNewService-create-service-container-side-createPackage">
            <span className="createNewService-label">Tạo gói *</span>
            <div className="createNewService-create-service-container-side">
              <Card sx={{ minWidth: 362 }}>
                <CardActions>
                  <HighlightOffIcon className="createNewService-btn-close" />
                </CardActions>
                <CardContent>
                  <div className="createNewService-package-container-all">
                    <div className="createNewService-package-container">
                      <label
                        className="createNewService-package-label"
                        htmlFor="createNewService-package-name"
                      >
                        Tên gói
                      </label>
                      <input
                        placeholder="Gói cơ bản,..."
                        className="createNewService-package-input"
                        id="createNewService-package-name"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        className="createNewService-package-label"
                        htmlFor="createNewService-package-price"
                      >
                        Giá gói
                      </label>
                      <input
                        placeholder="50.000, 60.000,..."
                        className="createNewService-package-input"
                        id="createNewService-package-price"
                        type="number"
                      />
                    </div>
                    <div>
                      <label
                        className="createNewService-package-label"
                        htmlFor="createNewService-package-time"
                      >
                        Thời gian
                      </label>
                      <Select
                        id="createNewService-package-time"
                        className="createNewService-package-select"
                        value={time}
                        onChange={handleChangeTime}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={1}>1 tiếng</MenuItem>
                        <MenuItem value={2}>2 tiếng</MenuItem>
                        <MenuItem value={3}>3 tiếng</MenuItem>
                      </Select>
                    </div>
                    <div>
                      <label
                        className="createNewService-package-label"
                        htmlFor="createNewService-package-houseworker"
                      >
                        Số người
                      </label>
                      <Select
                        id="createNewService-package-houseworker"
                        value={person}
                        className="createNewService-package-select"
                        onChange={handleChangePerson}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value={4}>1 người</MenuItem>
                        <MenuItem value={5}>2 người</MenuItem>
                        <MenuItem value={6}>3 người</MenuItem>
                      </Select>
                    </div>
                    <Button className="createNewService-package-btn-save">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button
              startIcon={<AddIcon />}
              className="createNewService-btn-add"
            >
              Thêm
            </Button>
          </div>
        </div>
        <div className="createNewService-btn-container">
          <button className="createNewService-btn">Tạo</button>
          <button className="createNewService-btn">Hủy</button>
        </div>
      </FormControl>
    </>
  );
}
