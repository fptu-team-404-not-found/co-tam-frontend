import React, { useState } from "react";
import "./Menu.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../../asset/image/CoTamLogo.png";

export default function Menu(props) {
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
                to="/accountmanager"
                className="menu-list-item"
              >
                Tài khoản
              </ListItem>
              <ListItem
                style={props.styledService}
                component={NavLink}
                to="/service"
                className="menu-list-item"
              >
                Dịch vụ
              </ListItem>
              <ListItem
                style={props.styledPromotion}
                component={NavLink}
                to="/promotion"
                className="menu-list-item"
              >
                Khuyến mãi
              </ListItem>
              <ListItem
                style={props.styledBuilding}
                component={NavLink}
                to="/building"
                className="menu-list-item"
              >
                Tòa nhà
              </ListItem>
              <ListItem
                style={props.styledArea}
                component={NavLink}
                to="/area"
                className="menu-list-item"
              >
                Khu vực
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
