import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import about from "../../assets/about.png";
import LazyLoad from "react-lazy-load";

function About() {
  return (
    <>
      <Header></Header>
      <Container fluid style={{ padding: 0, marginTop: "10rem" }}>
        <Row className="d-flex flex-column align-items-center justify-content-center p-3">
          <h1 style={{ textAlign: "center", fontFamily: "Julius Sans One" }}>
            Lotus Harmony
          </h1>
          <Col className="d-flex justify-content-center">
            <LazyLoad height={300} width={300}>
              <img
                src={about}
                alt="Yoga"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </LazyLoad>
          </Col>
          <Col lg={6} md={6}>
            <p className="text-center" style={{ fontStyle: "italic" }}>
              At Lotus Harmony, we believe in the transformative power of yoga
              to bring balance and harmony to your life. Our online store is a
              haven for yoga enthusiasts, offering a curated selection of
              high-quality yoga essentials to elevate your practice.
            </p>
            <p className="text-center" style={{ fontStyle: "italic" }}>
              Whether you're a seasoned yogi or just beginning your journey,
              Lotus Harmony is your trusted partner on the path to wellness.
              Join us on the journey to find your inner peace and embrace the
              beauty of a harmonious life. Discover serenity, shop with
              confidence, and embark on a transformative yoga experience with
              Lotus Harmony.
            </p>
            <p className="text-center" style={{ fontStyle: "italic" }}>
              Namaste
            </p>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default About;
