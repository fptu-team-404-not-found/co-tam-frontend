import React, { useEffect, useState } from "react";
import "./Login.scss";
import image from "../../asset/image/LoginPic.png";
import logo from "../../asset/image/GoogleLogo.png";
import { Button } from "@mui/material";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { useNavigate } from "react-router";
import jwt_decode from 'jwt-decode';
import swal from "sweetalert";

export default function Login() {
  const [profile, setProfile] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const getAPI =
    "https://cotam.azurewebsites.net/api/auth/admin-manager/login-ver";
  const clientId =
    "544071594305-f80so58ktvoau1kd2gtvnm61f8mr0hpj.apps.googleusercontent.com";

  let navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client: auth2", start);
  });

  const onSuccess = (res) => {
    console.log(res.profileObj.email);
    setProfile(res.profileObj.email);
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    setProfile(null);
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(getAPI, {
          params: {
            email: profile,
          },
        })
        .catch(function (error) {
          if (error.response.data.data == null) {
            setProfile(null);
          }
        })
        .then((res) => {
          if (res.data.data !== null) {
            // setAccessToken(res.data.data.accessToken);
            var decoded = jwt_decode(res.data.data.accessToken)
            
            localStorage.setItem('accessToken', res.data.data.accessToken);
            localStorage.setItem('user', decoded.role)
            localStorage.setItem('name', decoded.name)

            if (localStorage.getItem('user') == 'Admin'){
              navigate('/accountmanager')
            } else if (localStorage.getItem('user') == 'Manager') {
              navigate('/accounthouseworker')
            } 
          }
        });
    };
    fetchData();
  }, [profile]);

  return (
    <>
      <div className="login-container">
        <img className="login-img" src={image} alt="" />
        <div className="login-right-container">
          <h1>CÔ TẤM</h1>
          <p>Đăng nhập với tài khoản của bạn</p>
          <GoogleLogin
            className="login-btn"
            clientId="544071594305-f80so58ktvoau1kd2gtvnm61f8mr0hpj.apps.googleusercontent.com"
            buttonText="Đăng nhập"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          >
            Login with Google
          </GoogleLogin>
        </div>
        {/* <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.imageUrl} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div> */}
      </div>
    </>
  );
}
