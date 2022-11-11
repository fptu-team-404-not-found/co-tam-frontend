import React, { useState } from "react";
import "./Menu.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../../asset/image/CoTamLogo.png";

export default function MenuManager(props) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="menu-container">
        {open == true ? (
          <>
            <div className="menu-logo-container">
              <img src={logo} className="menu-logo" />
            </div>
            <ul className="menu-list-open">
              <ListItem
                style={props.styledAccount}
                component={NavLink}
                to="/accounthouseworker"
                className="menu-list-item"
              >
                Tài khoản
              </ListItem>
              <ListItem
                style={props.styledOrder}
                component={NavLink}
                to="/order"
                className="menu-list-item"
              >
                Đơn hàng
              </ListItem>
            </ul>
          </>
        ) : undefined}
      </div>
      <button onClick={() => setOpen(!open)} className="menu-list-toggle">
        <MenuIcon />
      </button>
    </>
  );
}
