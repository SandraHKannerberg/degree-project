import { Row } from "react-bootstrap";
import "./Banner.css";
import subscribe from "../../assets/subscribe.jpg";
import subscribeText from "../../assets/subscribe-text.png";

function BannerSubscribe() {
  return (
    <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
      {/* <h5 className="text-center mb-3">Subscribe</h5> */}
      <Row className="banner-container d-flex justify-content-center align-items-center mb-5">
        <img
          src={subscribeText}
          alt="Subscribe to newsletter. 10% off on your first order"
          className="banner-box"
        />
        <img src={subscribe} alt="Yoga on a mountain" className="banner-box" />
      </Row>
    </Row>
  );
}

export default BannerSubscribe;
