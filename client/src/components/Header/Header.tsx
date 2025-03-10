import LogInOffcanvas from "../LogInOffcanvas/LogInOffcanvas";
import Logotype from "../Logotype/Logotype";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Menu from "../Menu/Menu";
import { Container } from "react-bootstrap";

// Header component with Logotype, User-icon (for login or signup), Shoppingcart and menu of categories
function Header() {
  return (
    <header className="fixed-top w-100">
      {/* Main header container */}
      <Container fluid className="px-4 bg-accent-clr">
        <Row className="m-0 align-items-center">
          {/* Logotype */}
          <Col xs={6} className="p-0">
            <Logotype />
          </Col>

          {/* Icons (Login and Cart) */}
          <Col
            xs={6}
            className="d-flex justify-content-end align-items-center p-0"
          >
            <div className="d-flex gap-3 align-items-center">
              <LogInOffcanvas />
              <ShoppingCart />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Main Menu */}
      <Menu />
    </header>
  );
}

export default Header;
