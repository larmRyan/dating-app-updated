import React, { useState } from "react";
import "./TwoTruthsOneLie.css";
import { useAuth } from "./contexts/AuthContext";
import { db } from "./Firebase";
import { Link } from "react-router-dom";

export default function TwoTruthsOneLie(props) {

    const [truth1, setTruth1] = useState("");
    const [truth2, setTruth2] = useState("");
    const [lie, setLie] = useState("");
    const { currentUser } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();

        setTruth1(event.target.truth1.value);
        setTruth2(event.target.truth2.value);
        setLie(event.target.lie.value);

        db.collection("users").doc(currentUser.uid).update({
            ttol: {
                truth1: truth1,
                truth2: truth2,
                lie: lie
            }
        });
    }


    return (
        <div>
        <form className="TwoTruthsOneLie" onSubmit={handleSubmit}>
            <ul>
            <li className="form-row truth">
                <input id="truth1" type="text" name="truth1" />
                <label htmlFor="truth1">First Truth</label>
            </li>

            <li className="form-row truth">
                <input id="truth2" type="text" name="truth2" />
                <label htmlFor="truth2">Second Truth</label>
            </li>

            <li className="form-row lie">
                <label htmlFor="lie">Lie</label>
                <input id="lie" type="text" name="lie" />
            </li>

            <li className="form-row">
                <Link to="/questions">
                    <input type="submit" value="Send" />
                </Link>
            </li>
            </ul>
        </form>
        </div>
    );
} // end ttol

