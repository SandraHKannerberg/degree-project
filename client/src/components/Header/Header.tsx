import LogInBtn from "../LogInBtn/LogInBtn";
import Logotype from "../Logotype/Logotype";
import ShoppingCartIcon from "../ShoppingCartIcon/ShoppingCartIcon";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#A78295",
        height: "5rem",
        padding: 0,
        margin: 0,
      }}
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
            <LogInBtn />
            <ShoppingCartIcon />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
