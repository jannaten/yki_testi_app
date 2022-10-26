import { routes } from "../config";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Facebook } from "react-bootstrap-icons";
import FacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "../components/common/toast.component";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { onHandleUserValueChange, signInOrUp } from "../redux/slices";

function IdentifyPage() {
  const { home } = routes;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { initialInputValues } = useSelector(({ user }) => user);

  const handleCallbackResponseGoogle = async (token) => {
    try {
      await dispatch(signInOrUp({ token, platform: "google" }));
      successToast("Succesfully logged in");
      navigate(home);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCallbackResponseFacebook = async (response) => {
    try {
      if (response.accessToken) {
        await dispatch(
          signInOrUp({ token: response.accessToken, platform: "facebook" })
        );
        navigate(home);
        successToast("Succesfully logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      await dispatch(
        signInOrUp({
          email: initialInputValues.email,
          password: initialInputValues.password,
        })
      );
      navigate(home);
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
      // navigate(home);
    }
    /* global google */
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              padding: "0rem",
              marginTop: "2rem",
              width: "fit-content",
              borderRadius: "0.3rem",
              border: "0.1rem solid #066CD2",
            }}
          >
            <Facebook
              className="ms-2 mb-1"
              color="#066CD2"
              width={18}
              height={18}
            />
            <FacebookLogin
              appId="1394130381115728"
              fields="name,email,picture"
              callback={handleCallbackResponseFacebook}
            />
          </div>
          <div id="signInDiv" style={{ width: "15%", marginTop: "1rem" }}></div>
        </Form.Group>
      </Container>
    </div>
  );
}

export default IdentifyPage;
