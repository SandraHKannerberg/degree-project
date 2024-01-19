import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { useEffect } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";
import { PatchCheckFill, Stars } from "react-bootstrap-icons";

function Confirmation() {
  const { verifyPayment, isPaymentVerified } = useCartContext();

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <Container fluid className="my-5" style={{ minHeight: "50vh" }}>
        {isPaymentVerified ? (
          <Row className="d-flex justify-content-center">
            <Col lg={4} className="d-flex justify-content-center">
              <Card className="h-100 shadow">
                <Card.Body
                  className="d-flex flex-column"
                  style={{ padding: 0, color: "#331d2c" }}
                >
                  <Card.Title
                    className="d-flex justify-content-center align-items-center mb-4"
                    style={{
                      fontSize: "18px",
                      height: "10rem",
                      backgroundImage:
                        "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
                      margin: 0,
                    }}
                  >
                    <PatchCheckFill
                      style={{
                        fontSize: "60px",
                        color: "#fff",
                        filter: "drop-shadow(0 0 0.75rem green)",
                      }}
                    />
                  </Card.Title>

                  <Card.Title
                    className="flex-grow-1 text-center px-4"
                    style={{ fontSize: "18px" }}
                  >
                    <h4>Thank you for your order</h4>
                  </Card.Title>
                  <Card.Title
                    className="flex-grow-1 text-center mb-3 px-4"
                    style={{ fontSize: "18px" }}
                  >
                    <h5>
                      <Stars style={{ fontSize: "25px" }} /> Payment successfull{" "}
                      <Stars style={{ fontSize: "25px" }} />
                    </h5>
                  </Card.Title>
                  <Card.Text className="mt-3 px-3 mb-0">
                    <p>Order confirmation will be sent to MAIL</p>
                  </Card.Text>
                  <Card.Text className="px-3 my-0">
                    <p>Total amount BELOPP</p>
                  </Card.Text>
                  <Card.Text className="px-3 my-0">
                    <p>Ordernumber NUMBER</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <div>
            <p>
              Something went wrong with the payment. We can't handle your order.
            </p>
          </div>
        )}
      </Container>

      <Footer />
    </>
  );
}

export default Confirmation;
