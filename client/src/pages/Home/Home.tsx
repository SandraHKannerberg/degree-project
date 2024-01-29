import Header from "../../components/Header/Header";
import yoga from "../../assets/yoga.mp4";
import { Button, Container, Row, Col, Nav } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import "./Home.css";

function Home() {
  return (
    <>
      <Header />
      <Container
        fluid
        style={{
          padding: 0,
          margin: 0,
        }}
      >
        <Row
          className="video-background mx-0 d-flex justify-content-center w-100"
          style={{
            padding: 0,
            marginTop: "7.5rem",
          }}
        >
          <video className="video" autoPlay loop muted>
            <source src={yoga} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Title (company name) and go to shop button - section */}
          <Col
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
