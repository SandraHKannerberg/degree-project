import { Button, Col, Tab, Tabs } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Person, PersonFillCheck, PersonFillGear } from "react-bootstrap-icons";
import { useState } from "react";
import LogInForm from "../LogInForm/LogInForm";
import { Link } from "react-router-dom";
import SignUpForm from "../SignUpForm/SignUpForm";
import "./LogInOffcanvas.css";

// Component to handle log in
// Click on the Person/user icon and an offcanvas to login will appear
function LogInOffcanvas() {
  const [show, setShow] = useState(false);
  const { loggedInUser, logout } = useUserContext();

  // Open vs. close the offcanvas
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col>
        {/* Show Person icon without checkmark if not logged in and connect button-click to handleShow to it.
      When logged in - show filled Person icon with checkmark and the name of the user. */}
        {loggedInUser ? (
          loggedInUser.isAdmin ? (
            <>
              {/*Show this when logged in as admin */}
              <Button
                onClick={logout}
                style={{ background: "none", border: "none" }}
                className="zoom-effect"
              >
                Log out
              </Button>

              {/* A button with a gear. This is now a link to the adminpanel */}
              <Button
                className="zoom-effect"
                style={{ background: "none", border: "none" }}
              >
                <Link
                  to="/admin"
                  className="menu-link"
                  style={{
                    color: "#EFE1D1",
                  }}
                >
                  <PersonFillGear
                    style={{
                      border: "none",
                      borderRadius: 0,
                      color: "#EFE1D1",
                      fontSize: "2rem",
                    }}
                  />
                </Link>
              </Button>
            </>
          ) : (
            <>
              {/* Show this when logged in as a regular user */}
              <Button
                onClick={logout}
                style={{ background: "none", border: "none" }}
              >
                Log out
              </Button>

              {/* The button is now filled with a checkmark and is a link to the memberpage */}
              <Button style={{ background: "none", border: "none" }}>
                <Link
                  to="/mypage"
                  className="menu-link"
                  style={{
                    color: "#EFE1D1",
                  }}
                >
                  <PersonFillCheck
                    style={{
                      border: "none",
                      borderRadius: 0,
                      color: "#EFE1D1",
                      fontSize: "2rem",
                    }}
                  />
                </Link>
              </Button>
            </>
          )
        ) : (
          <>
            {/* Show this when not logged in. Click on the button and the offcanvas to login or sigup shows */}
            <Button
              onClick={handleShow}
              style={{ background: "none", border: "none" }}
            >
              <Person
                style={{
                  border: "none",
                  borderRadius: 0,
                  color: "#EFE1D1",
                  fontSize: "2rem",
                }}
              />
            </Button>
          </>
        )}
      </Col>

      {/* Offcanvas with login-form or signup-form to register new user depending if you want to log in or sign up */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{
          backgroundColor: "#A78295",
          color: "#EFE1D1",
          padding: 0,
        }}
      >
        <Offcanvas.Body className="p-0 d-flex flex-column align-items-center">
          {/* Menu (tabs) to choose Log In or Sign Up */}
          <Tabs
            defaultActiveKey="login"
            id="myTabs"
            style={{
              borderBottom: "1px solid #fff",
              backgroundColor: "#85586f",
              border: "none",
            }}
            className="w-100 pt-4 px-4 mb-0"
            fill
          >
            <Tab
              eventKey="signup"
              title={<div className="tab-label bg-custom-tab">Sign Up</div>}
              className="mb-0 login-tab"
            >
              {/* Import the SignUpForm to be able to register a new user */}
              <SignUpForm />
            </Tab>
            <Tab
              eventKey="login"
              title={<div className="tab-label bg-custom-tab">Log In</div>}
              className="mt-0 login-tab"
            >
              {/* Import the LogInForm to be able to log in */}
              <LogInForm />
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default LogInOffcanvas;
