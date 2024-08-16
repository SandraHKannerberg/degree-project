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
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${border})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <Col xs={12} md={12} style={{ marginTop: "4rem" }}>
        <h1
          className="mt-3"
          style={{ textAlign: "center", fontFamily: "Julius Sans One" }}
        >
          Lotus Harmony
        </h1>
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          Find Your Zen, Embrace the Harmony - Lotus Harmony, Where Your Yoga
          Journey Begins
        </p>
      </Col> */}

      <Col
        xs={12}
        md={12}
        className="d-flex flex-md-column justify-content-center align-items-center"
      >
        <Row className="d-flex justify-content-center gap-5 my-4">
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
        </Row>
      </Col>
    </Row>
  );
}

export default Banner;
