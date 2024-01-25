import LogInOffcanvas from "../LogInOffcanvas/LogInOffcanvas";
import Logotype from "../Logotype/Logotype";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Menu from "../Menu/Menu";

// Header component with Logotype, User-icon, Shoppingcart and menu of categories
function Header() {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#A78295",
        height: "5rem",
      }}
      className="p-0 mb-5 fixed-top"
    >
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          margin: 0,
        }}
      >
        <Col xs={6} style={{ padding: 0 }}>
          <Logotype />
        </Col>
        <Col
          xs={6}
          className="d-flex justify-content-end"
          style={{ padding: 0 }}
        >
          <div className="d-flex gap-2">
            <LogInOffcanvas />
            <ShoppingCart />
          </div>
        </Col>
      </Row>
      <Menu />
    </Container>
  );
}

export default Header;
