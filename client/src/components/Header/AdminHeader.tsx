import LogInOffcanvas from "../LogInOffcanvas/LogInOffcanvas";
import Logotype from "../Logotype/Logotype";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";

function AdminHeader() {
  return (
    <header className="fixed-top w-100">
      <Container fluid className="px-4 bg-accent-clr">
        <Row className="m-0 align-items-center">
          {/* Logotype */}
          <Col xs={6} className="p-0">
            <a href="/" aria-label="Homepage">
              <Logotype />
            </a>
          </Col>

          <Col
            xs={6}
            className="d-flex justify-content-end align-items-center p-0"
          >
            <div className="d-flex gap-3">
              <LogInOffcanvas />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default AdminHeader;
