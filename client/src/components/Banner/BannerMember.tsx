import { Row } from "react-bootstrap";
import "./Banner.css";
import signUp from "../../assets/signup.jpg";

function BannerMember() {
  return (
    <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <h5 className="text-center mb-3">Sign up today</h5>
      <Row className="banner-container d-flex justify-content-center align-items-center mb-5">
        <img
          src={signUp}
          alt="Yoga class"
          style={{
            width: "50%",
            height: "100%",
            objectFit: "cover",
            padding: 0,
          }}
        />
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
            Club Lotus Harmony <br></br>
            Sign up today
          </h3>
        </div>
      </Row>
    </Row>
  );
}

export default BannerMember;
