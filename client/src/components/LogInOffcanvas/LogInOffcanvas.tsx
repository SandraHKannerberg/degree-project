import { Button, Col, Tab, Tabs, Toast, ToastContainer } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Person, PersonFillCheck, PersonFillGear } from "react-bootstrap-icons";
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
            className="zoom-effect"
            style={{ background: "none", border: "none" }}
          >
            <Link
              to="/loggedin"
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
        </Col>
      ) : null}

      {/* When logged in as admin - show filled Person icon with a gear. */}
      {loggedInUser?.isAdmin ? (
        <Col>
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
        </Col>
      ) : null}

      {/* Not logged in - show a person outlined icon. This icon handle open OffCanvas for login / signup */}
      {!loggedInUser ? (
        <Button
          className="zoom-effect"
          style={{ background: "none", border: "none" }}
          onClick={handleShow}
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
      ) : (
        <Button
          style={{
            backgroundColor: "#A78295",
            border: "none",
            borderRadius: 0,
            color: "#EFE1D1",
            fontWeight: 500,
          }}
          className="shadow zoom-effect"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      )}

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
        <Offcanvas.Header     
        style={{
          backgroundColor: "#85586f",
          color: "#EFE1D1",
          display: "flex",
          justifyContent: "flex-end"
        }} 
        closeButton
        >
        </Offcanvas.Header>
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
