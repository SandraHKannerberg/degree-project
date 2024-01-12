import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Container
      fluid
      style={{ backgroundColor: "#DFD3C3", minHeight: "30vh", marginBottom: 0 }}
    >
      <Row className="text-center mt-2 pt-3">
        <Col>
          <h1
            style={{
              color: "#331d2c",
              fontFamily: "Julius Sans One",
              fontSize: "30px",
            }}
          >
            Lotus Harmony
          </h1>
        </Col>
      </Row>
      <Row className="d-flex flex-column justify-content-center align-items-center">
        <Col xs={6} className="text-center pb-3">
          <h6>
            Subscribe to receive our offers in preview and enjoy 10% off on your
            first order
          </h6>
        </Col>
        <Col xs={10} sm={8} md={7} lg={5} className="pb-3">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter your e-mail"
              aria-label="E-mail"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Text
              id="basic-addon2"
              style={{ backgroundColor: "#331d2c", color: "#EFE1D1" }}
            >
              Subscribe
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Row className="d-flex justify-content-around text-center">
        <Col>
          <h6>
            <Link to="/about" className="menu-link">
              About us
            </Link>
          </h6>
        </Col>
        <Col>
          <h6>
            <Link to="/contact" className="menu-link">
              Contact us
            </Link>
          </h6>
        </Col>
        <Col className="d-flex justify-content-center text-center">
          <div className="d-flex gap-2">
            <h5>
              <Facebook />
            </h5>
            <h5>
              <Instagram />
            </h5>
            <h5>
              <Linkedin />
            </h5>
          </div>
        </Col>
        <Col
          xs={12}
          className="d-flex justify-content-center alig-items-center pt-3"
        >
          <p style={{ fontSize: "12px" }}>
            Copyright &copy; Degree project 2024 - Sandra Höst Kannerberg -
            Medieinstitutet
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
