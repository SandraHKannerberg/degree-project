import { Row } from "react-bootstrap";
import "./Banner.css";
import signUp from "../../assets/signup.jpg";
import signUpText from "../../assets/signup-text.png";

function BannerSignup() {
  return (
    <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <h5 className="text-center mb-3">Sign up today</h5>
      <Row className="banner-container d-flex justify-content-center mb-5">
        <img src={signUp} alt="Yoga class" className="banner-box" />
        <img
          src={signUpText}
          alt="Subscribe to newsletter"
          className="banner-box"
        />
      </Row>
    </Row>
  );
}

export default BannerSignup;
