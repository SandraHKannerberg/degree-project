import { Button, Col, Tab, Tabs } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Person, PersonCheckFill } from "react-bootstrap-icons";
import { useState } from "react";
import LogInForm from "../LogInForm/LogInForm";
import { Link } from "react-router-dom";
import NewUserForm from "../NewUserForm/NewUserForm";
import "./LogInBtn.css";

// Component to handle log in
// Click on the Person/user icon and an offcanvas to login will appear
function LogInBtn() {
  const [show, setShow] = useState(false);
  const { loggedInUser } = useUserContext();

  // Open vs. close the log in offcanvas
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col>
        {/* Show Person icon without checkmark if not logged in and connect button-click to handleShow to it.
      When logged in - show filled Person icon with checkmark and the name of the user. */}

        {!loggedInUser ? (
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
            ></Person>
          </Button>
        ) : (
          <>
            <span>
              <Link
                to="/mypage"
                className="menu-link"
                style={{
                  color: "#EFE1D1",
                }}
              >
                {loggedInUser.firstName}
              </Link>
            </span>
            <Button
              onClick={handleShow}
              style={{ background: "none", border: "none" }}
            >
              <PersonCheckFill
                style={{
                  border: "none",
                  borderRadius: 0,
                  color: "#EFE1D1",
                  fontSize: "2rem",
                }}
              ></PersonCheckFill>
            </Button>
          </>
        )}
      </Col>

      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{
          backgroundColor: "#85586f",
          color: "#EFE1D1",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Club Lotus Harmony</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Tabs
            defaultActiveKey="login"
            id="myTabs"
            style={{ borderBottom: "1px solid #a78295" }}
          >
            <Tab eventKey="signup" title="Sign Up" className="bg-custom-tab">
              {/* Import the NewUserForm to be able to register a new user */}
              <NewUserForm />
            </Tab>
            <Tab eventKey="login" title="Log In" className="bg-custom-tab">
              {/* Import the LogInForm to be able to log in */}
              <LogInForm />
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default LogInBtn;
