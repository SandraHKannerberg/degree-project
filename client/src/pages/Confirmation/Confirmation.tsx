import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Row,
  Spinner,
} from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import { PatchCheckFill, Stars } from "react-bootstrap-icons";
import errorpayment from "../../assets/error-payment.png";

// Confirmation page --- Different content depending on payment status
function Confirmation() {
  const { emptyCart } = useCartContext();
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationDetails, setConfirmationDetails] = useState({
    email: "",
    totalAmount: 0,
    orderNumber: "",
  });

  // Function to verify the payment and fetch order-details if payment = success
  const verifyThePayment = async () => {
    try {
      // Get the sessionId saved in localStorage
      const sessionId = localStorage.getItem("session-id");

      if (!sessionId) {
        return;
      }

      // Fetch from server to verify-session
      const response = await fetch("/api/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      const { verified, orderDetails } = await response.json();

      //Check if payment is verified
      if (verified) {
        setIsPaymentVerified(true);

        // Extract order details
        const { email, totalAmount, orderNumber } = orderDetails;

        //If payment is verified remove session-id from loaclStorage
        localStorage.removeItem("session-id");
        //If payment is verified empty shoppingcart
        emptyCart();

        // Set state to be able to use order details in the UI at successfull payment
        setConfirmationDetails({ email, totalAmount, orderNumber });
      } else {
        setIsPaymentVerified(false);
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
    } finally {
      // Set loading to false once verification is complete
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyThePayment();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <Container
        fluid
        className="my-5"
        style={{ minHeight: "35vh", marginTop: "10rem" }}
      >
        {isLoading ? (
          // Display loader while verifying payment
          <div className="text-center">
            <Spinner animation="border" /> <br />
            <p>Please wait while processing your payment...</p>
            {/* You can add a spinner or any loading indicator here */}
          </div>
        ) : isPaymentVerified ? (
          // If payment = success - show this content
          <Row
            className="d-flex justify-content-center flex-column align-items-center"
            style={{ marginTop: "10rem" }}
          >
            <Col lg={5} className="d-flex justify-content-center mb-3">
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
                    className="flex-grow-1 text-center mb-1 px-4"
                    style={{ fontSize: "18px" }}
                  >
                    <h5>
                      <Stars style={{ fontSize: "25px" }} /> Payment successfull{" "}
                      <Stars style={{ fontSize: "25px" }} />
                    </h5>
                  </Card.Title>
                  <Card.Text
                    className="px-3 my-2 text-center"
                    style={{ fontSize: "18px" }}
                  >
                    {confirmationDetails.totalAmount} SEK
                  </Card.Text>
                  <Card.Text className="mt-3 px-3 mb-3 text-center">
                    Order confirmation will be sent to{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {confirmationDetails.email}
                    </span>
                  </Card.Text>
                  <Card.Text className="px-3 my-2 text-center mb-4">
                    Ordernumber <br />{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {confirmationDetails.orderNumber}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} className="d-flex justify-content-center my-3">
              <Button
                size="sm"
                style={{
                  backgroundColor: "#85586f",
                  border: "none",
                  borderRadius: 0,
                  color: "#EFE1D1",
                  fontWeight: 500,
                }}
              >
                <Nav.Link href="/shop">Continue shopping</Nav.Link>
              </Button>
            </Col>
          </Row>
        ) : (
          // If payment failed - show this content
          <Row
            className="d-flex justify-content-center"
            style={{ marginTop: "10rem" }}
          >
            <Col className="d-flex flex-column justify-content-center align-items-center my-4">
              <img
                src={errorpayment}
                alt="Error"
                style={{ width: "100px" }}
                className="mb-3"
              />
              <p className="text-center">
                Oops. Something went wrong with the payment.
                <br />
                We can't handle your order. Please try again.
              </p>
              <Button
                size="sm"
                style={{
                  backgroundColor: "#85586f",
                  border: "none",
                  borderRadius: 0,
                  color: "#EFE1D1",
                  fontWeight: 500,
                }}
              >
                <Nav.Link href="/shop">Back to shop</Nav.Link>
              </Button>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Confirmation;
