import { Button, Card, Col, Row } from "react-bootstrap";
import { PatchCheckFill, Stars } from "react-bootstrap-icons";

function Success() {
  return (
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
          Continue shopping
        </Button>
      </Col>
    </Row>
  );
}

export default Success;
