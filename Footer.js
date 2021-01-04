import React from "react";
import "./Footer.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import IconButton from "@material-ui/core/IconButton";

import { Link } from "react-router-dom";

export default function Footer({ home, chat }) {
  return (
    <div className="footer">
      <Link to="/profile">
        <IconButton>
          <AccountCircleIcon className="footer__icon" fontSize="medium" />
        </IconButton>
      </Link>

      <Link to={`/${home}`}>
        <IconButton>
          <VisibilityOutlinedIcon className="footer__icon" fontSize="medium" />
        </IconButton>
      </Link>

      {/* <Link to={`/chat/${name}`}> */}
      <Link to={`/${chat}`}>
        <IconButton>
          <ModeCommentOutlinedIcon className="footer__icon" fontSize="medium" />
        </IconButton>
      </Link>
    </div>
  );
}
