import React, { useState } from "react";
import "./Menu.scss";
import MenuIcon from "@mui/icons-material/Menu";

export default function Menu() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="menu-container">
        {open == true ? (
          <ul className="menu-list-open">
            <li className="menu-list-item active">Tài khoản</li>
            <li className="menu-list-item">Dịch vụ</li>
            <li className="menu-list-item">Khuyến mãi</li>
            <li className="menu-list-item">Tòa nhà</li>
            <li className="menu-list-item">Khu vực</li>
            <li className="menu-list-item">Cài đặt</li>
          </ul>
        ) : undefined}
      </div>
      <button onClick={() => setOpen(!open)} className="menu-list-toggle">
        <MenuIcon />
      </button>
    </>
  );
}
