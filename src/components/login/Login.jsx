import React, { useEffect, useState } from "react";
import "./Login.scss";
import image from "../../asset/image/LoginPic.png";
import logo from "../../asset/image/GoogleLogo.png";
import { Button } from "@mui/material";
import axios from "axios";

const getAPI = "https://cotam.azurewebsites.net/api/auth/admin-manager/login";

export default function Login() {
  const [data, setData] = useState([]);

    const fetchData = async () => {
      await axios
        .get(getAPI)
        .then((res) => {
          console.log(res.request);
        });
    };
    fetchData();

  return (
    <div className="login-container">
      <img className="login-img" src={image} alt="" />
      <form className="login-right-container">
        <h1>CÔ TẤM</h1>
        <p>Đăng nhập với tài khoản của bạn</p>
        <Button onClick={() => fetchData()} className="login-right-btn"><img className="login-right-logo" src={logo} alt="Logo Google" />Login with Google</Button>
      </form>
    </div>
  );
}
