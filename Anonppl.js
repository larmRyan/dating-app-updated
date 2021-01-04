import React from "react";
import "./Anonppl.css";
import { Link } from "react-router-dom";

export default function Anonppl() {
  return (
    <div class="cards">
      <Link to="/ttol">
        <button className="anonButton"> 🐼 ANON PANDA </button>
      </Link>
      <button className="anonButton"> 🐭 ANON MOUSE </button>
    </div>
  );
}
