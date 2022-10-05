import React, { useEffect, useState } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from "../Header/Header";
import Navbar from "../nav/Navbar";
import "./Configuration.scss";


export default function Configuration() {
  


  return (
    <>
      <div className="configuration-container">
        <Navbar />
        <Header title="Cài đặt" />
        <p className="configuration-infor">Hello</p>
      </div>
    </>
  );
}
