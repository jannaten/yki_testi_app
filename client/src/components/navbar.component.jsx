import { routes } from "../config";
import Avatar from "boring-avatars";
import React, { useState } from "react";
import { NavBarHolder } from "../styles";
import { SecondaryButton } from "../styles";
import { useNavigate } from "react-router-dom";
import { onClearUserValue } from "../redux/slices";
import { PlusLg, XLg } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { successToast } from "./common/toast.component";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { home, identify } = routes;
  const { user } = useSelector(({ user }) => user);
  const [toggleButton, setToggleButton] = useState(false);

  return (
    <NavBarHolder expand="lg">
      <Container fluid>
        <Navbar.Brand className="px-4 mt-1">
          <h5 style={{ color: "#FBFAF5" }} onClick={() => navigate(home)}>
            YKI harjoittelu
          </h5>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{ border: "none", boxShadow: "none" }}
        >
          {toggleButton ? (
            <XLg
              color="#fff"
              width={35}
              height={35}
              onClick={() => setToggleButton(!toggleButton)}
            />
          ) : (
            <PlusLg
              color="#fff"
              width={35}
              height={35}
              onClick={() => setToggleButton(!toggleButton)}
            />
          )}
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          {user && (
            <div
              style={{
                color: "#fff",
                width: "fit-content",
                borderRadius: "0.3rem",
                border: "0.1rem solid #fff",
                marginRight: "1rem",
                padding: "0.2rem 1rem",
              }}
            >
              <Avatar
                size={40}
                variant="beam"
                name={user.full_name}
                colors={["#92A1C6", "#146A7C", "#ffffff", "#C271B4", "#C20D90"]}
              />
              <span className="me-2 ms-2">{user.username}</span>
            </div>
          )}
          <SecondaryButton
            className="me-5"
            variant=""
            onClick={() => {
              if (user) {
                localStorage.removeItem("token");
                navigate(home);
                dispatch(onClearUserValue());
                successToast("Succesfully logged out");
              } else {
                navigate(identify);
              }
            }}
          >
            {user ? "sign out" : "sign in"}
          </SecondaryButton>
        </Navbar.Collapse>
      </Container>
    </NavBarHolder>
  );
};

export default NavbarComponent;
