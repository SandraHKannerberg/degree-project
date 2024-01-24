import { Button, Col, Row } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useUserContext } from "../../context/UserContext";
import Orders from "../../components/Orders/Orders";
import { useState } from "react";

function User() {
  const { loggedInUser, logout } = useUserContext();
  const [showOrders, setShowOrders] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleOrdersButtonClick = () => {
    setShowOrders(true);
    setShowWelcome(false);
  };

  const handleNameClick = () => {
    setShowOrders(false);
    setShowWelcome(true);
  };

  return (
    <>
      <Header />
      {loggedInUser ? (
        <Row
          className="d-flex mx-3"
          style={{ marginTop: "10rem", minHeight: "50vh" }}
        >
          <Col
            lg={3}
            className="p-3"
            style={{ borderRight: "1px solid #DFD3C3" }}
          >
            <Row
              className="mx-1 zoom-effect"
              onClick={handleNameClick}
              style={{ cursor: "pointer" }}
            >
              <h5>{loggedInUser.firstName}</h5>
            </Row>
            <Row className="mx-1">
              <p>{loggedInUser.email}</p>
            </Row>
            <Row className="mb-2 mx-1">
              <Button
                style={{
                  backgroundColor: "#A78295",
                  border: "none",
                  borderRadius: 0,
                  color: "#EFE1D1",
                  fontWeight: 500,
                }}
                className="shadow zoom-effect"
                onClick={handleOrdersButtonClick}
              >
                My Orders
              </Button>
            </Row>
            <Row className="mt-2 mx-1">
              <Button
                style={{
                  backgroundColor: "#A78295",
                  border: "none",
                  borderRadius: 0,
                  color: "#EFE1D1",
                  fontWeight: 500,
                }}
                className="shadow zoom-effect"
                onClick={logout}
              >
                Log Out
              </Button>
            </Row>
          </Col>
          <Col>
            {showOrders && <Orders />}
            {showWelcome && <p>Welcome</p>}
          </Col>
        </Row>
      ) : (
        <p>You need to log in for this page</p>
      )}
      <Footer />
    </>
  );
}

export default User;
