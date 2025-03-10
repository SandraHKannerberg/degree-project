import { Button, Col, Row } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

// Sidebar as a menu when logged in
function Sidebar() {
  const { loggedInUser } = useUserContext();
  return (
    <>
      {loggedInUser ? (
        <Col
          lg={3}
          className="p-2"
          style={{
            borderRight: "1px solid #DFD3C3",
          }}
        >
          <Row className="mx-1" style={{ cursor: "pointer" }}>
            <Link to={"/loggedin"} className="menu-link">
              <h5>{loggedInUser.firstName}</h5>
            </Link>
          </Row>
          <Row className="mx-1">
            <p>{loggedInUser.email}</p>
          </Row>
          <Row className="mb-2 mx-1">
            <Link to={"/loggedin/orders"} style={{ padding: 0 }}>
              <Button
                style={{
                  backgroundColor: "#A78295",
                  border: "none",
                  borderRadius: 0,
                  color: "#EFE1D1",
                  fontWeight: 500,
                  width: "100%",
                }}
                className="shadow zoom-effect"
              >
                My Orders
              </Button>
            </Link>
          </Row>
        </Col>
      ) : null}
    </>
  );
}

export default Sidebar;
