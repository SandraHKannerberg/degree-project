import { Button, Col, Row } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import LogOut from "../LogOut/LogOut";
import { Link } from "react-router-dom";

function Sidebar() {
  const { loggedInUser } = useUserContext();
  return (
    <>
      {loggedInUser ? (
        <Col
          lg={2}
          className="p-3"
          style={{
            borderRight: "1px solid #DFD3C3",
          }}
        >
          <Row className="mx-1" style={{ cursor: "pointer" }}>
            <Link to={"/mypage"} className="menu-link">
              <h5>{loggedInUser.firstName}</h5>
            </Link>
          </Row>
          <Row className="mx-1">
            <p>{loggedInUser.email}</p>
          </Row>
          <Row className="mb-2 mx-1">
            <Link to={"/mypage/orders"} style={{ padding: 0 }}>
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
          <Row className="mt-2 mx-1">
            <LogOut></LogOut>
          </Row>
        </Col>
      ) : null}
    </>
  );
}

export default Sidebar;
