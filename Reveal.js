import React, { useState, useEffect } from "react";
import "./Profile.css";
import IconButton from "@material-ui/core/IconButton";
import "./Onboarding/BioInfo";
import Logout from "./Logout";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "./contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import Fab from '@material-ui/core/Fab';

import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import {firebase, db} from "./Firebase"

// import { useCollectionData } from 'react-firebase-hooks/firestore'

const image = "https://diy-magazine.s3.amazonaws.com/d/diy/Artists/G/Girl-In-red/_landscape/188378/Girl-in-Red_-by-Chris-Almeida-1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(3),
  },
}));


export default function Reveal() {
  const [input, setInput] = useState('');
  const [name, setUsername]= useState('');
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleSend = e => {
    e.preventDefault();
  
    db.collection('chats').add({
      message: input,
      name: name,
      profilePic: image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return (
    <div className="profile">
    <Avatar className="profile__image" src="https://diy-magazine.s3.amazonaws.com/d/diy/Artists/G/Girl-In-red/_landscape/188378/Girl-in-Red_-by-Chris-Almeida-1.jpg" />
      <div className="profile__details">
        <p className="profile__subtitle">NAME</p>
        <h2 className="profile__content">Christina</h2>
        <p className="profile__subtitle">EDUCATION</p>
        <h2 className="profile__content">WashU</h2>
        <p className="profile__subtitle">HOBBIES</p>
        <h2 className="profile__content">Skiing, hiking, eating</h2>
      
      <Link to="/chat">
        <Fab color="secondary" aria-label="add" className="fab__two" >
          <FavoriteIcon onClick={handleSend}/>
        </Fab>
      </Link>

      <Link to="/home">
        <Fab color="primary" aria-label="edit" className="fab__one" >
          <CloseIcon />
        </Fab>
      </Link>
      </div>
      
    </div>
  )
}
