import { Col, Container, Row } from "react-bootstrap";

function NoAccess401() {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="d-flex justify-content-center align-items-center flex-column">
          <h1 className="text-center" style={{ fontSize: "150px" }}>
            401
          </h1>
          <h1 className="text-center">
            {" "}
            Error - You have no access to this page
          </h1>
        </Col>
      </Row>
    </Container>
  );
}

export default NoAccess401;
