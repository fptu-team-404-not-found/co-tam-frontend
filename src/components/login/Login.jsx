import React from "react";
import "./Login.scss";
import image from "../../asset/image/LoginPic.png";
import logo from "../../asset/image/GoogleLogo.png";
import { Button } from "@mui/material";

export default function Login() {
  return (
    <div className="login-container">
      <img className="login-img" src={image} alt="" />
      <div className="login-right-container">
        <h1>CÔ TẤM</h1>
        <p>Đăng nhập với tài khoản của bạn</p>
        <Button className="login-right-btn"><img className="login-right-logo" src={logo} alt="Logo Google" />Login with Google</Button>
        
      </div>
    </div>
  );
}
