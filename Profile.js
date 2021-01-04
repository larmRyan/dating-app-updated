import React, { useState } from "react";
import "./Profile.css";
import IconButton from "@material-ui/core/IconButton";
import "./Onboarding/BioInfo";
//import Logout from "./Logout";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "./contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from "./Firebase";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [name, setName] = useState("");
  const [edu, setEdu] = useState("");
  const [hobbies, setHobbies] = useState("");

  const history = useHistory();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  var docRef = db.collection("users").doc(currentUser.email);

  docRef.get().then(function (doc) {
    if (doc.exists) {
      setName(doc.data().name);
      setEdu(doc.data().education);
      setHobbies(doc.data().hobbies);
    } else {
      console.log("No doc");
    }
  });

  return (
    <div className="profile">
      <Avatar
        className="profile__image"
        src="https://st2.depositphotos.com/2783505/8295/i/950/depositphotos_82958312-stock-photo-portrait-of-a-guy-with.jpg"
      />
      <div className="profile__details">
        <p className="profile__subtitle">NAME</p>
        <h2 className="profile__content">{name}</h2>
        <p className="profile__subtitle">EDUCATION</p>
        <h2 className="profile__content">{edu}</h2>
        <p className="profile__subtitle">HOBBIES</p>
        <h2 className="profile__content">{hobbies}</h2>
      </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
