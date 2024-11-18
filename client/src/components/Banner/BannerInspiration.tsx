import { Row } from "react-bootstrap";
import "./Banner.css";
import yogaPose from "../../assets/yoga-pose.jpg";
import yoga from "../../assets/yoga-mat.jpg";

function BannerInspiration() {
  return (
    <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <h4 className="text-center mb-3">Find your strength</h4>
      <Row className="banner-container d-flex justify-content-center mb-5">
        <img className="banner-box" src={yogaPose} alt="Yoga" />
        <img className="banner-box" src={yoga} alt="Yoga" />
      </Row>
    </Row>
  );
}

export default BannerInspiration;
