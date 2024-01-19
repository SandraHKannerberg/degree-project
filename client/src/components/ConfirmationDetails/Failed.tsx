import { Button, Col, Nav, Row } from "react-bootstrap";
import sad from "../../assets/sad.png";

function Failed() {
  return (
    <Row className="d-flex justify-content-center">
      <Col className="d-flex flex-column justify-content-center align-items-center my-4">
        <img
          src={sad}
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
  );
}

export default Failed;
