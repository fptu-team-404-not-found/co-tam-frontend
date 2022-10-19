import { Breadcrumbs } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./AccountInformationHouseworker.scss";
import EditIcon from '@mui/icons-material/Edit';

export default function AccountInformationHouseworker() {
  const navigate = useNavigate();

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/accountcustomer"
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

  return (
    <>
      <Menu />
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
        <img
          className="accountInformation-img"
          src="https://img.wattpad.com/dba69c709f8041a610050e22fc8234e61a2a6572/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3431694d63554b463264336476773d3d2d33392e313561373539313830383337353439393332333135343633343439362e6a7067"
        />
        <table className="accountInformation-text-container">
          <tr>
            <th>Họ tên</th>
            <td>Bill Gates</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>nguyenlamthuyphuong</td>
          </tr>
          <tr>
            <th>Số điện thoại</th>
            <td>555 77 855</td>
          </tr>
          <tr>
            <th>Công việc</th>
            <td>Làm này làm kia</td>
          </tr>
          <EditIcon className="accountInformation-btn-edit"/>
        </table>
      </div>
    </>
  );
}