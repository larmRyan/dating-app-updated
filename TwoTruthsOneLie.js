import React, { useState } from "react";
import "./TwoTruthsOneLie.css";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./Firebase";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { Link } from "react-router-dom";

// remove the link to questions
export default function TwoTruthsOneLie(props) {
  const [truth1, setTruth1] = useState("");
  const [truth2, setTruth2] = useState("");
  const [lie, setLie] = useState("");
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleChangeTruth1 = (event) => {
    setTruth1(event.target.value);
  };

  const handleChangeTruth2 = (event) => {
    setTruth2(event.target.value);
  };

  const handleChangeLie = (event) => {
    setLie(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setTruth1(event.target.truth1.value);
    // setTruth2(event.target.truth2.value);
    // setLie(event.target.lie.value);

    try {
      db.collection("users")
        .doc(currentUser.email)
        .update({
          ttol: {
            truth1: truth1,
            truth2: truth2,
            lie: lie
          }
        })
        .then(function () {
          history.push("home");
        });
      db.collection("twoTruths").add({
        message: truth1,
        name: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      db.collection("twoTruths").add({
        message: truth2,
        name: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      db.collection("twoTruths").add({
        message: lie,
        name: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error(error.name);
      console.error(error.message);
    }
  };

  return (
    <div>
      <p>Two Truths, One Lie</p>
      <p id="desc">Send them to your Masqed Matches</p>
      <form className="TwoTruthsOneLie" onSubmit={handleSubmit}>
        <ul>
          <li className="form-row truth">
            <label htmlFor="truth1">First Truth</label>
            <input
              id="truth1"
              type="text"
              name="truth1"
              onChange={handleChangeTruth1}
              className="text-input"
              required
            />
          </li>

          <li className="form-row truth">
            <label htmlFor="truth2">Second Truth</label>
            <input
              id="truth2"
              type="text"
              name="truth2"
              onChange={handleChangeTruth2}
              className="text-input"
              required
            />
          </li>

          <li className="form-row lie">
            <label htmlFor="lie">Lie</label>
            <input
              id="lie"
              type="text"
              name="lie"
              onChange={handleChangeLie}
              className="text-input"
              required
            />
          </li>

          <li className="form-row send-button">
            <input type="submit" value="Send" className="submit" />
          </li>
        </ul>
      </form>
    </div>
  );
} // end ttol
