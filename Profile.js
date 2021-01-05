import React, { useState } from "react";
// import "./Profile.css";
import IconButton from "@material-ui/core/IconButton";

import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "./contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Button, Alert } from "react-bootstrap";
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from "./Firebase";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [name, setName] = useState("");
  const [edu, setEdu] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [pic, setPic] = useState("");
  const [music, setMusic] = useState("");
  const [work, setWork] = useState("");
  const [shower, setShower] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const history = useHistory();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to logout");
    }
  }

  try {
    var docRef = db.collection("users").doc(currentUser.email);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        setName(doc.data().name);
        setEdu(doc.data().education);
        setHobbies(doc.data().hobbies);
        setPic(doc.data().pic1);
        setMusic(doc.data().music);
        setWork(doc.data().work);
        setShower(doc.data().shower);
        setAge(doc.data().age);
        setCity(doc.data().city);
        setState(doc.data().state);
      } else {
        console.log("No doc");
      }
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <div>
        <Avatar className="profile__image" src={pic} />
        <div>
          <Row inline>
            <Col>
              <p>NAME</p>
            </Col>
            <Col>
              <p>{name}</p>
            </Col>
          </Row>
          <Row inline>
            <Col>
              <p>EDUCATION</p>
            </Col>
            <Col>
              <p>{edu}</p>
            </Col>
          </Row>
          <Row inline>
            <Col>
              <p>HOBBIES</p>
            </Col>
            <Col>
              <p>{hobbies}</p>
            </Col>
          </Row>
          <Row inline>
            <Col>
              <p>MUSIC</p>
            </Col>
            <Col>
              <p>{music}</p>
            </Col>
          </Row>
          <Row inline>
            <Col>
              <p>WORK</p>
            </Col>
            <Col>
              <p>{work}</p>
            </Col>
          </Row>
          <Row inline>
            <Col>
              <p>SHOWER THOUGHTS</p>
            </Col>
            <Col>
              <p>{shower}</p>
            </Col>
          </Row>
          <Row inline>
            <Col>
              <p>CITY</p>
            </Col>
            <Col>
              <p>{city}</p>
            </Col>
          </Row>
          <Row inline>
            <Col>
              <p>STATE</p>
            </Col>
            <Col>
              <p>{state}</p>
            </Col>
          </Row>
        </div>
        <Row>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </Row>
      </div>
    </div>
  );
}
