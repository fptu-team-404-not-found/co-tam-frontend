import React, { useState } from "react";
import "./HeaderHaveTab.scss";
import Account from "../account/AccountHouseWorker";
import AccountHouseWorker from "../account/AccountHouseWorker";
import AccountCustomer from "../account/AccountCustomer";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function HeaderHaveTab(header) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Nhân viên" component={Link} to="/" />
        <Tab
          label="Khách hàng"
          component={Link}
          to="/accountcustomer"
        />
      </Tabs>
      <h1 className="header-title">{header.title}</h1>
    </>
  );
}
