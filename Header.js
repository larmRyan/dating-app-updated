import React from "react";
import "./Header.css";
import ArrowLeftOutlinedIcon from "@material-ui/icons/ArrowLeftOutlined";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";

export default function Header({ backButton }) {
  const history = useHistory();
  return (
    <div className="header">
      {backButton ? (
        <IconButton onClick={() => history.replace(backButton)}>
          <ArrowLeftOutlinedIcon className="header__icon" fontSize="medium" />
        </IconButton>
      ) : (
        <h1> h </h1>
      )}
    </div>
  );
}
