import axios from "axios";
import { api } from "../config";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const INITIAL_SIGN_IN_DATA = {
  email: "",
  password: "",
};

function IdentifyPage() {
  const history = useHistory();
  const { userSignIn } = api;
  const [initialInputValues, setInitialInputValues] =
    useState(INITIAL_SIGN_IN_DATA);

  const handleCallbackResponse = async (token) => {
    try {
      const response = await axios.post(userSignIn, { token });
      const decoded = jwt_decode(response.data.token);
      console.log("response ", decoded);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleChange = (e) => {
    const value = e.target.value;
    setInitialInputValues({ ...initialInputValues, [e.target.name]: value });
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(userSignIn, {
        email: initialInputValues.email,
        password: initialInputValues.password,
      });
      const decoded = jwt_decode(response.data.token);
      console.log("response ", decoded);
      setInitialInputValues(INITIAL_SIGN_IN_DATA);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      // google.accounts.id.prompt();
      google.accounts.id.initialize({
        client_id:
          "695731560544-97qetivnd557fmungu98e14t5sdh600q.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "medium",
      });
    } catch (error) {
      console.log(error.message);
      history.push("/");
    }
    /* global google */
  }, []);

  return (
    <div>
      <Container style={{ paddingTop: "15vh" }}>
        <Form.Group style={{ width: "100%" }}>
          <Row>
            <Col lg={3} md={6} sm={12}>
              <h2>Sign in</h2>
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={initialInputValues.email}
                onChange={onHandleChange}
                placeholder="type your email here"
              />
              <Form.Label className="mt-2">password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={onHandleChange}
                value={initialInputValues.password}
                placeholder="type your password here"
              />
              <Button
                variant=""
                className="mt-3"
                style={{ color: "white", backgroundColor: "#9967CE" }}
                onClick={onSubmit}
              >
                login
              </Button>
            </Col>
          </Row>
          <div id="signInDiv" style={{ width: "14%", marginTop: "2rem" }}></div>
        </Form.Group>
      </Container>
    </div>
  );
}

export default IdentifyPage;
