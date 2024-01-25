import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import ManagingOrders from "../../components/ManagingOrders/ManagingOrders";
import LogOut from "../../components/LogOut/LogOut";

function Admin() {
  const { loggedInUser } = useUserContext();
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showAdmin, setShowAdmin] = useState(true);

  const handleOrdersButtonClick = () => {
    setShowOrders(true);
    setShowAdmin(false);
    setShowProducts(false);
  };

  const handleProductsButtonClick = () => {
    setShowProducts(true);
    setShowOrders(false);
    setShowAdmin(false);
  };

  const handleAdminClick = () => {
    setShowAdmin(true);
    setShowOrders(false);
    setShowProducts(false);
  };

  return (
    <>
      <Header />

      <Container className="h-100">
        {loggedInUser?.isAdmin === true ? (
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
                onClick={handleAdminClick}
                style={{ cursor: "pointer" }}
              >
                <h5>{loggedInUser.firstName}</h5>
              </Row>
              <Row className="mx-1">
                <p>You are admin</p>
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
                  Managing Orders
                </Button>
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
                  onClick={handleProductsButtonClick}
                >
                  Managing Products
                </Button>
              </Row>
              <Row className="mt-2 mx-1">
                <LogOut></LogOut>
              </Row>
            </Col>
            <Col>
              {showOrders && <ManagingOrders />}
              {showProducts && <p>Admin Panel for products</p>}
              {showAdmin && <p>Welcome Admin panel</p>}
            </Col>
          </Row>
        ) : (
          <Row
            className="d-flex mx-3"
            style={{ marginTop: "10rem", minHeight: "50vh" }}
          >
            <p className="text-center">
              You are not authorized for this page. Please log in
            </p>
          </Row>
        )}
      </Container>

      <Footer />
    </>
  );
}

export default Admin;
