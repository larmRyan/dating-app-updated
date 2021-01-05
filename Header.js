import React from "react";
import "./Header.css";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowLeftOutlinedIcon from "@material-ui/icons/ArrowLeftOutlined";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
});

export default function SimpleBottomNavigation({ backButton }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="header"
    >
      <Link to={`/${backButton}`}>
        <BottomNavigationAction className="header__icon" label="" icon={<ArrowLeftOutlinedIcon />} />
      </Link>
    </BottomNavigation>
  );
}

function Header({ backButton }) {
  return (
    <div className="header">
        <IconButton>
          <ArrowLeftOutlinedIcon className="header__icon" fontSize="medium" />
        </IconButton>
    </div>
  );
}
