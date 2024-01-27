import { Col, Container, Row } from "react-bootstrap";

function Error404() {
  return (
    <Container fluid style={{ marginTop: "10rem", height: "100vh" }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="d-flex justify-content-center align-items-center">
          <h1 className="text-center">404 - Oops can't find the page</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Error404;
