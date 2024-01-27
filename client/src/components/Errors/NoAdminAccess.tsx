import { Col, Container, Row } from "react-bootstrap";

function NoAdminAccess() {
  return (
    <Container
      fluid
      style={{
        marginTop: "7rem",
      }}
    >
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="d-flex justify-content-center align-items-center">
          <h2 className="text-center">
            Oops! You have no access to this page.
          </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default NoAdminAccess;
