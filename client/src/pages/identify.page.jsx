import { routes } from "../config";
import React, { useEffect } from "react";
import { successToast } from "../components";
import { useHistory } from "react-router-dom";
import { Facebook } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { onHandleUserValueChange, signInOrUp } from "../redux/slices";
import { FacebookAuthButton } from "../styles/buttons.styles";

function IdentifyPage() {
  const { home } = routes;
  const history = useHistory();
  const dispatch = useDispatch();
  const { initialInputValues } = useSelector(({ user }) => user);

  const handleCallbackResponseGoogle = async (token) => {
    try {
      await dispatch(signInOrUp({ token, platform: "google" }));
      successToast("Succesfully logged in");
      history.push(home);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCallbackResponseFacebook = async (response) => {
    await dispatch(
      signInOrUp({ token: response.access_token, platform: "facebook" })
    );
    history.push(home);
    successToast("Succesfully logged in");
  };

  const onFailure = (response) => console.error(response);

  const onSubmit = async () => {
    try {
      await dispatch(
        signInOrUp({
          email: initialInputValues.email,
          password: initialInputValues.password,
        })
      );
      history.push(home);
      successToast("Succesfully logged in");
      // const decoded = jwt_decode(response.data.token);
      // console.log("response ", decoded);
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
        callback: handleCallbackResponseGoogle,
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
                placeholder="type your email here"
                onChange={(e) => dispatch(onHandleUserValueChange(e))}
              />
              <Form.Label className="mt-2">password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={initialInputValues.password}
                placeholder="type your password here"
                onChange={(e) => dispatch(onHandleUserValueChange(e))}
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
          <div
            style={{
              border: "0.1rem solid #066CD2",
              borderRadius: "0.3rem",
              width: "fit-content",
              marginTop: "2rem",
              padding: "0.2rem",
            }}
          >
            <Facebook
              className="ms-1 mb-1"
              color="#066CD2"
              width={18}
              height={18}
            />
            <FacebookAuthButton
              className="facebookAuthButton"
              buttonText="Connect with facebook"
              authorizationUrl="https://www.facebook.com/dialog/oauth"
              responseType="token"
              // clientId="1961643604225793"
              // redirectUri="http://localhost:3000"
              // clientId={
              //   process.env.NODE_ENV === "development"
              //     ? "1961643604225793"
              //     : "835936037455876"
              // }
              clientId="1961643604225793"
              redirectUri={`http://${window.location.href.split("/")[2]}`}
              scope="email"
              onSuccess={handleCallbackResponseFacebook}
              onFailure={onFailure}
            />
          </div>
          <div id="signInDiv" style={{ width: "15%", marginTop: "1rem" }}></div>
        </Form.Group>
      </Container>
    </div>
  );
}

export default IdentifyPage;
