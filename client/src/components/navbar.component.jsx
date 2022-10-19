import { routes } from "../config";
import React, { useState } from "react";
import { NavBarHolder } from "../styles";
import { useHistory } from "react-router-dom";
// import { useWindowDimensions } from "../hooks";
import { PlusLg, XLg } from "react-bootstrap-icons";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const NavbarComponent = () => {
  // const size = useWindowDimensions();
  const history = useHistory();
  const { home, identify } = routes;
  const [toggleButton, setToggleButton] = useState(false);
  return (
    <NavBarHolder expand="lg">
      <Container fluid>
        <Navbar.Brand className="px-4 mt-1">
          <h5 style={{ color: "#FBFAF5" }} onClick={() => history.push(home)}>
            YKI practice app
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
          <Button
            variant=""
            style={{
              backgroundColor: "#FBFAF5",
              color: "#9967CE",
              marginRight: "2rem",
            }}
            onClick={() => history.push(identify)}
          >
            sign in
          </Button>
        </Navbar.Collapse>
      </Container>
    </NavBarHolder>
  );
};

export default NavbarComponent;
