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
        <Col md="auto" xs={2} style={{ padding: 0, backgroundColor: "red" }}>
          <Logotype />
        </Col>
        <Col
          md="auto"
          sm={4}
          xs={4}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            padding: 0,
          }}
        >
          <LogInBtn />
          <ShoppingCartIcon />
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
