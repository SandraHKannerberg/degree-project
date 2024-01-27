import { Col, Container, Row } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";

function NoUserAccess() {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="d-flex justify-content-center align-items-center">
          <h2 className="text-center">
            Oops! You have no access to this page. Please log in by clicking the{" "}
            <Person style={{ fontSize: "50px" }} /> icon above
          </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default NoUserAccess;
