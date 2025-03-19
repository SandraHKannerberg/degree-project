import Header from "../../components/Header/Header";
import yoga from "../../assets/yoga.mp4";
import { Container, Row } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";

//Landingpage
function Home() {
  return (
    <>
      <Header />
      <Container fluid className="p-0 m-0">
        <Row className="video-background d-flex justify-content-center align-items-center p-0 m-0">
          <video
            className="video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={yoga} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <section className="hero-content text-center text-white position-relative">
            <h1 className="display-4 title-font text-light-clr ">
              Lotus Harmony
            </h1>
            <Link
              to={"/shop"}
              className="lead text-decoration-none text-light-clr"
            >
              Start shopping
            </Link>
          </section>
        </Row>
      </Container>
    </>
  );
}

export default Home;
