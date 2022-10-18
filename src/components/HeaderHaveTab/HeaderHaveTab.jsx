import React, { useState } from "react";
import "./HeaderHaveTab.scss";
import Account from "../account/AccountHouseWorker";
import AccountHouseWorker from "../account/AccountHouseWorker";
import AccountCustomer from "../account/AccountCustomer";
import { Link, NavLink } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function HeaderHaveTab(header, tab) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs id="headerHaveTab-tab-container" onChange={handleChange}>
        <Tab
          className="headerHaveTab-tab"
          label="Quản lý"
          component={NavLink}
          to="/accountmanager"
        />
        <Tab
          className="headerHaveTab-tab"
          label="Nhân viên"
          component={NavLink}
          to="/accounthouseworker"
        />
        <Tab
          className="headerHaveTab-tab"
          label="Khách hàng"
          component={NavLink}
          to="/accountcustomer"
        />
      </Tabs>
      <h1 className="header-title">{header.title}</h1>
    </>
  );
}
