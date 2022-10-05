import { Search } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import Menu from "../menu/Menu";
import "./Navbar.scss";
import AddIcon from "@mui/icons-material/Add";

export default function Navbar() {
  return (
    <>
      <Menu />
      <div className="navbar-container">
        <TextField
          className="navbar-search"
          label="Tìm kiếm"
          type="search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Button startIcon={<AddIcon />} id="navbar-add-btn">
          Thêm
        </Button>
      </div>
    </>
  );
}
