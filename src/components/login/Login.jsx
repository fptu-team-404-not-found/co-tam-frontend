import React, { useEffect, useState } from "react";
import "./Login.scss";
import image from "../../asset/image/LoginPic.png";
import logo from "../../asset/image/GoogleLogo.png";
import { Button } from "@mui/material";
import axios from "axios";

export default function Login() {
  // const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   await axios.get(getAPI)
  //   .then((res) => {
  //     setData(res);
  //     console.log(res.request);
  //   });
  // };
  // fetchData();

  const getAPI = "https://cotam.azurewebsites.net/api/auth/admin-manager/login";

  return (
    <>
      <div className="login-container">
        <img className="login-img" src={image} alt="" />
        <div className="login-right-container">
          <h1>CÔ TẤM</h1>
          <p>Đăng nhập với tài khoản của bạn</p>
          <form method="GET" action={getAPI}>
            <Button
              type="submit"
              name="provider"
              value="Google"
              title={`Login using Google`}
              className="login-right-btn"
            >
              <img className="login-right-logo" src={logo} alt="Logo Google" />
              Login with Google
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
