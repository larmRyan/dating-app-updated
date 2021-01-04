import React, { useState } from "react";
import "./TwoTruthsOneLie.css";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./Firebase";
import { useHistory } from "react-router-dom";

// remove the link to questions
export default function TwoTruthsOneLie(props) {
  const [truth1, setTruth1] = useState("");
  const [truth2, setTruth2] = useState("");
  const [lie, setLie] = useState("");
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleChange = (event) => {
    setTruth1(event.target.value);
    setTruth2(event.target.value);
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
          history.push("questions");
        });
    } catch (error) {
      console.error(error.name);
      console.error(error.message);
    }
  };

  return (
    <div>
      <form className="TwoTruthsOneLie" onSubmit={handleSubmit}>
        <ul>
          <li className="form-row truth">
            <input
              id="truth1"
              type="text"
              name="truth1"
              onChange={handleChange}
              required
            />
            <label htmlFor="truth1">First Truth</label>
          </li>

          <li className="form-row truth">
            <input
              id="truth2"
              type="text"
              name="truth2"
              onChange={handleChange}
              required
            />
            <label htmlFor="truth2">Second Truth</label>
          </li>

          <li className="form-row lie">
            <label htmlFor="lie">Lie</label>
            <input
              id="lie"
              type="text"
              name="lie"
              onChange={handleChange}
              required
            />
          </li>

          <li className="form-row">
            {/* <Link to="/questions"> */}
            <input type="submit" value="Send" />
            {/* </Link> */}
          </li>
        </ul>
      </form>
    </div>
  );
} // end ttol
