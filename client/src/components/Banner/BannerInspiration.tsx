import { Row } from "react-bootstrap";
import "./Banner.css";
import yogaPose from "../../assets/yoga-pose.jpg";
import yoga from "../../assets/yoga-mat.jpg";

function BannerInspiration() {
  return (
    <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <h5 className="text-center mb-3">Find your strength</h5>
      <Row className="banner-container d-flex justify-content-center mb-5">
        <img
          src={yogaPose}
          alt="Yoga"
          style={{
            width: "50%",
            height: "100%",
            objectFit: "cover",
            padding: 0,
          }}
        />
        <img
          src={yoga}
          alt="Yoga"
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
