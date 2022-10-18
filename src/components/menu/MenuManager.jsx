import React, { useState } from "react";
import "./Menu.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function MenuManager() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="menu-container">
        {open == true ? (
          <ul className="menu-list-open">
            <ListItem component={NavLink} to="/accounthouseworker" className="menu-list-item" >Tài khoản</ListItem>
          </ul>
        ) : undefined}
      </div>
      <button onClick={() => setOpen(!open)} className="menu-list-toggle">
        <MenuIcon />
      </button>
    </>
  );
}
