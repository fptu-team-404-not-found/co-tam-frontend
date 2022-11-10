import React from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router";
import "./Logout.scss";

export default function Logout() {
  let navigate = useNavigate();
  const clientId =
    "544071594305-f80so58ktvoau1kd2gtvnm61f8mr0hpj.apps.googleusercontent.com";
  const logOut = () => {
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div className="log-container">
      <span className="log-name">Hi, {localStorage.getItem("name")}</span>
      <GoogleLogout
        className="logout-btn"
        clientId={clientId}
        buttonText="Log out"
        onLogoutSuccess={logOut}
      />
    </div>
  );
}
