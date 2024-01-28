import yoga1 from "../../assets/yoga1.jpg";
import yoga2 from "../../assets/yoga2.jpg";
import yoga3 from "../../assets/yoga3.jpg";
import border from "../../assets/border.jpg";
import { Col, Row } from "react-bootstrap";
import LazyLoad from "react-lazy-load";

// Component with banner
function Banner() {
  return (
    <Row
      style={{
        backgroundImage: `url(${border})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1
        className="mt-3"
        style={{ textAlign: "center", fontFamily: "Julius Sans One" }}
      >
        Lotus Harmony
      </h1>
      <Row>
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          Find Your Zen, Embrace the Harmony - Lotus Harmony, Where Your Yoga
          Journey Begins
        </p>
      </Row>

      <Col className="d-flex justify-content-center gap-5 my-4">
        <LazyLoad height={300} width={300}>
          <img
            className="shadow"
            src={yoga1}
            alt="Yoga"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "0 95%",
              borderRadius: "50%",
            }}
          />
        </LazyLoad>
        <LazyLoad height={300} width={300}>
          <img
            className="shadow"
            src={yoga2}
            alt="Yoga"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "0 90%",
              borderRadius: "50%",
            }}
          />
        </LazyLoad>
        <LazyLoad height={300} width={300}>
          <img
            className="shadow"
            src={yoga3}
            alt="Yoga"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "0 70%",
              borderRadius: "50%",
            }}
          />
        </LazyLoad>
      </Col>
    </Row>
  );
}

export default Banner;
