import { Button, Col, Tab, Tabs, Toast, ToastContainer } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  BoxArrowRight,
  Person,
  PersonFillCheck,
  PersonFillGear,
} from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import LogInForm from "../LogInForm/LogInForm";
import { Link, useNavigate } from "react-router-dom";
import SignUpForm from "../SignUpForm/SignUpForm";
import "./LogInOffcanvas.css";

// Component to handle log in
// Click on the Person/user icon and an offcanvas to login will appear
function LogInOffcanvas() {
  const [show, setShow] = useState(false); // State for Offcanvas
  const { loggedInUser, logout } = useUserContext();
  const [showConfirm, setShowConfirm] = useState(false); // State for toast (confirm message)
  const navigate = useNavigate();

  // Open vs. close the offcanvas
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = async () => {
    await logout();
    setShowConfirm(true);

    //Redirect to shop
    navigate("/shop");
  };

  // Timeout for logged out confirm toast
  useEffect(() => {
    if (showConfirm === true) {
      setTimeout(() => {
        setShowConfirm(false);
      }, 5000); // 5sec
    }
  }, [showConfirm]);

  return (
    <>
      {/* Info without a toast to confirm successfully log out */}
      {showConfirm && (
        <ToastContainer
          position="top-end"
          className="p-3"
          style={{ zIndex: 1 }}
        >
          <Toast className="text-center">
            <Toast.Body> You have been successfully logged out.</Toast.Body>
          </Toast>
        </ToastContainer>
      )}

      {/* When logged in as a user - show filled Person icon with checkmark. */}
      {loggedInUser && !loggedInUser?.isAdmin ? (
        <Col>
          <Button
            className="zoom-effect border-0"
            style={{ background: "none" }}
            aria-label="Log out button"
          >
            <Link to="/loggedin" className="text-white">
              <PersonFillCheck className="border-0 rounded-0 fs-3" />
            </Link>
          </Button>
        </Col>
      ) : null}

      {/* When logged in as admin - show filled Person icon with a gear. Link to startpage for admin */}
      {loggedInUser?.isAdmin ? (
        <Col>
          <Button
            className="zoom-effect"
            style={{ background: "none", border: "none" }}
            aria-label="Log out button for admin"
          >
            <Link to="/admin" className="text-white text-decoration-none">
              <PersonFillGear className="fs-3 border-0 rounded-0" />
              Dashboard
            </Link>
          </Button>
        </Col>
      ) : null}

      {/* Not logged in - show a person outlined icon. This icon handle open OffCanvas for login / signup */}
      {!loggedInUser ? (
        <Button
          className="zoom-effect border-0 rounded-0"
          style={{ background: "none" }}
          onClick={handleShow}
          aria-label="Log in button"
        >
          <Person className="fs-3" />
        </Button>
      ) : (
        // Log out - icon button
        <Button
          className="zoom-effect border-0"
          style={{ background: "none" }}
          onClick={handleLogout}
          aria-label="Log out button"
        >
          <BoxArrowRight className="fs-3" />
        </Button>
      )}

      {/* Offcanvas with login-form or signup-form to register new user depending if you want to log in or sign up */}
      <Offcanvas show={show} onHide={handleClose} className="bg-light-clr p-0">
        <Offcanvas.Header
          className="bg-accent-clr d-flex justify-content-end"
          closeButton
        ></Offcanvas.Header>
        <Offcanvas.Body className="p-0 d-flex flex-column align-items-center">
          {/* Menu (tabs) to choose Log In or Sign Up */}
          <Tabs
            defaultActiveKey="login"
            id="myTabs"
            style={{
              borderBottom: "1px solid #fff",
              backgroundColor: "#85586f",
            }}
            className="w-100 pt-4 px-4 mb-0 border-0"
            fill
          >
            <Tab eventKey="signup" title={<div>Sign Up</div>} className="mb-0">
              {/* Import the SignUpForm to be able to register a new user */}
              <SignUpForm />
            </Tab>
            <Tab eventKey="login" title={<div>Log In</div>} className="mt-0">
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
