import Header from "../../components/Header/Header";
import LogotypeLightColor from "../../components/Logotype/LogotypeLightColor";
import Banner from "../../components/Banner/Banner";
import yoga from "../../assets/yoga.mp4";
import { Button, Container, Row, Col, Nav } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import "./Home.css";
import Footer from "../../components/Footer/Footer";

//Landingpage
function Home() {
  return (
    <>
      <Header />
      <Container
        fluid
        style={{
          padding: 0,
          marginTop: "10rem",
        }}
      >
        <Row
          style={{
            flex: "display",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <LogotypeLightColor></LogotypeLightColor>
          <h1 style={{ textAlign: "center", fontFamily: "Julius Sans One" }}>
            Lotus Harmony
          </h1>

          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              marginBottom: "3rem",
            }}
          >
            Find Your Zen, Embrace the Harmony - Lotus Harmony, Where Your Yoga
            Journey Begins
          </p>
        </Row>
        <Row className="video-background mx-0 d-flex justify-content-center w-100">
          <video className="video" autoPlay loop muted>
            <source src={yoga} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Title (company name) and go to shop button - section */}
          {/* <Col
            className="d-flex align-items-end justify-content-end flex-column"
            style={{ margin: "3rem", marginBottom: "5rem" }}
          >
            <h1
              style={{
                color: "#EFE1D1",
                fontFamily: "Julius Sans One",
                fontSize: "50px",
                textShadow: "1px 1px 2px pink",
              }}
            >
              Lotus Harmony
            </h1>
            <Button
              size="lg"
              style={{
                backgroundColor: "#85586f",
                border: "none",
                borderRadius: 0,
                color: "#EFE1D1",
                flex: "display",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 500,
              }}
            >
              <Nav.Link href="/shop">
                To the shop{" "}
                <ArrowRight
                  style={{ margin: 0, padding: 0, fontSize: "30px" }}
                />
              </Nav.Link>
            </Button>
          </Col> */}
        </Row>
        <Row>
          <h1>Shop by category</h1>
          <Button
            size="lg"
            style={{
              backgroundColor: "#85586f",
              border: "none",
              borderRadius: 0,
              color: "#EFE1D1",
              flex: "display",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 500,
            }}
          >
            <Nav.Link href="/shop">See all products</Nav.Link>
          </Button>
        </Row>
        <Row>
          <Banner></Banner>
        </Row>
        <Row>
          <h1>Inspiration - Focus / Relax / Mindfullness / Inhale Exhale</h1>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Home;
