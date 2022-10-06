import React, { useState } from "react";
import "./Menu.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="menu-container">
        {open == true ? (
          <ul className="menu-list-open">
            <ListItem component={NavLink} to="/accounthouseworker" className="menu-list-item" >Tài khoản</ListItem>
            <ListItem component={NavLink} to="/service" className="menu-list-item" >Dịch vụ</ListItem>
            <ListItem component={NavLink} to="/promotion" className="menu-list-item" >Khuyến mãi</ListItem>
            <ListItem component={NavLink} to="/building" className="menu-list-item" >Tòa nhà</ListItem>
            <ListItem component={NavLink} to="/area" className="menu-list-item" >Khu vực</ListItem>
            <ListItem component={NavLink} to="/configuration" className="menu-list-item" >Cài đặt</ListItem>
          </ul>
        ) : undefined}
      </div>
      <button onClick={() => setOpen(!open)} className="menu-list-toggle">
        <MenuIcon />
      </button>
    </>
  );
}
