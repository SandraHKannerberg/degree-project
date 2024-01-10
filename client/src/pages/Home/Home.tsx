import Header from "../../components/Header/Header";
import yoga from "../../assets/yoga.mp4";
import { Button, Container, Row, Col } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import "./Home.css";

function Home() {
  return (
    <Container fluid style={{ padding: 0 }}>
      <Header />
      <Row className="video-background">
        <video className="video" autoPlay loop muted>
          <source src={yoga} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Col
          className="d-flex align-items-end justify-content-end flex-column"
          style={{ margin: "3rem" }}
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
            To the shop{" "}
            <ArrowRight style={{ margin: 0, padding: 0, fontSize: "30px" }} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;