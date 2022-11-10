import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../header/Header";
import Navbar from "../nav/Navbar";
import "./Configuration.scss";

export default function Configuration() {
  return (
    <>
      <div className="configuration-container">
        <Navbar  styled={{ display: 'none' }} disabled='disabled'/>
        <Header title="Thông tin" />
        <p className="configuration-infor">
          Thông tin trang.
        </p>
      </div>
    </>
  );
}
