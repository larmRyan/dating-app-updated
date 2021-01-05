import React from "react";
import ReactDOM from "react-dom";
import { Container, Card } from "react-bootstrap";
// import firestore from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
  >
    <div className="w-100" style={{ maxWidth: "576px" }}>
      <Card>
        <Card.Body>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Card.Body>
      </Card>
    </div>
  </Container>,
  rootElement
);
