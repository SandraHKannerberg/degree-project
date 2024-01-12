import { Button, Col } from "react-bootstrap";

function LogInBtn() {
  return (
    <Col>
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
      >
        Log In
      </Button>
    </Col>
  );
}

export default LogInBtn;
