import { Row } from "react-bootstrap";
import "./Banner.css";
import subscribe from "../../assets/subscribe.jpg";

function BannerSubscribe() {
  return (
    <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <h5 className="text-center mb-3">Subscribe</h5>
      <Row className="banner-container d-flex justify-content-center align-items-center mb-5">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: "50%",
            height: "100%",
            padding: 0,
          }}
        >
          <h3
            className="text-center"
            style={{
              color: "#f8ede3",
            }}
          >
            Subscribe to our Newsletter. <br></br>
            10% off on your first order
          </h3>
        </div>
        <img
          src={subscribe}
          alt="Yoga on a mountain"
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

export default BannerSubscribe;
