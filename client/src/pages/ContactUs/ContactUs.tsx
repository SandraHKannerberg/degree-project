import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

//Basic ContactUs page
function ContactUs() {
  return (
    <>
      <Header></Header>
      <Container
        fluid
        style={{ padding: 0, marginTop: "10rem", minHeight: "55vh" }}
      >
        <Row className="d-flex flex-column align-items-center justify-content-center p-3">
          <h1 style={{ textAlign: "center", fontFamily: "Julius Sans One" }}>
            Contact Us
          </h1>
          <Col>
            <p className="text-center">
              If you have any questions, please do not hesitate to contact us.
            </p>
          </Col>
          <Col className="d-flex flex-column justify-content-center align-items-center p-0 mt-4">
            <p>Street 1, 123 45 CITY</p>
            <p>073- 123 45 67</p>
            <p>mail@emailaddress.com</p>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default ContactUs;
