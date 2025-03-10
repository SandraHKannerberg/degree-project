import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// Footer with link to About page and ContactUs page
// Subscribe-section and socialmedia-icons are just for show
function Footer() {
  return (
    <footer className="w-100 shadow bg-light-clr-gradient py-3 mt-4">
      <Container>
        {/* Company Name */}
        <Row className="text-center mt-2 pt-3">
          <Col>
            <h3
              style={{
                color: "#331d2c",
                fontFamily: "Julius Sans One",
                fontSize: "30px",
              }}
            >
              Lotus Harmony
            </h3>
          </Col>
        </Row>

        {/* Newsletter Subscription */}
        <Row className="d-flex flex-column justify-content-center align-items-center mt-4">
          <Col xs={12} className="text-center pb-3 fs-6">
            <p>
              Subscribe to receive our offers in preview and enjoy 10% off on
              your first order
            </p>
          </Col>
          <Col xs={10} sm={8} md={7} lg={5} className="pb-3">
            <InputGroup className="mb-3">
              {/* Input */}
              <Form.Control
                type="email"
                placeholder="Enter your e-mail"
                aria-label="E-mail"
                aria-describedby="e-mail"
                required
              />
              {/* Button */}
              <InputGroup.Text id="e-mail" className="bg-dark text-white">
                Subscribe
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        {/* Links */}
        <Row className="d-flex justify-content-around text-center mb-3">
          <Col>
            <h4>
              <Link to="/about" className="menu-link fs-5">
                About us
              </Link>
            </h4>
          </Col>
          <Col>
            <h4>
              <Link to="/contact" className="menu-link fs-5">
                Contact us
              </Link>
            </h4>
          </Col>
        </Row>

        {/* Social Media Icons */}
        <Row className="d-flex justify-content-center text-center mb-3">
          <Col className="d-flex justify-content-center gap-3">
            <a href="#" aria-label="Facebook" className="text-dark">
              <Facebook size={32} />
            </a>
            <a href="#" aria-label="Instagram" className="text-dark">
              <Instagram size={32} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-dark">
              <Linkedin size={32} />
            </a>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="d-flex justify-content-center text-center pt-3">
          <Col>
            <small>
              Copyright &copy; Sandra Höst Kannerberg - Degree project 2024,
              Medieinstitutet
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
