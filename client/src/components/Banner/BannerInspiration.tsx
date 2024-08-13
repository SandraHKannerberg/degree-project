import { Row } from "react-bootstrap";
import "./BannerInspiration.css";
import relax from "../../assets/relax.jpg";
import yoga from "../../assets/yoga-mat.jpg";

function BannerInspiration() {
  return (
    <Row className="inspiration-wrapper d-flex justify-content-center align-items-center mt-5 mb-5">
      <Row className="inspiration-container d-flex justify-content-center mt-5 mb-5">
        <img
          src={relax}
          alt="Relax"
          style={{
            width: "50%",
            height: "100%",
            objectFit: "cover",
            padding: 0,
          }}
        />
        <img
          src={yoga}
          alt="Stones in nature"
          style={{
            width: "50%",
            height: "100%",
            objectFit: "cover",
            padding: 0,
          }}
        />
      </Row>
    </Row>
  );
}

export default BannerInspiration;
