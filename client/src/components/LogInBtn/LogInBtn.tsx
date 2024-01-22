import { Button, Col } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import LogInForm from "../LogInForm/LogInForm";

// Component with Log In vs. Log Out button, and offcanvas for the Log In - content
function LogInBtn() {
  const [show, setShow] = useState(false);
  const { loggedInUser, logout } = useUserContext();

  // Open vs. close the log in offcanvas
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col>
        {/* Show text Log In and connect button-click to handleShow if no one are logged in.
      Other wise show Log Out button and connect button-click to logout-function */}
        {!loggedInUser ? (
          <Button
            size="lg"
            style={{
              backgroundColor: "#85586f",
              border: "none",
              borderRadius: 0,
              color: "#EFE1D1",
              fontWeight: 500,
            }}
            className="shadow"
            onClick={handleShow}
          >
            Log In
          </Button>
        ) : (
          <Button
            size="lg"
            style={{
              backgroundColor: "#85586f",
              border: "none",
              borderRadius: 0,
              color: "#EFE1D1",
              fontWeight: 500,
            }}
            className="shadow"
            onClick={logout}
          >
            Log Out
          </Button>
        )}
      </Col>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Club Lotus Harmony</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Import the LogInForm */}
          <LogInForm />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default LogInBtn;
