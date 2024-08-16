import Header from "../../components/Header/Header";
import LogotypeLightColor from "../../components/Logotype/LogotypeLightColor";
import yoga from "../../assets/yoga.mp4";
import { Container, Row } from "react-bootstrap";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import ShopByCategory from "../../components/ShopByCategory/ShopByCategory";
import BannerInspiration from "../../components/Banner/BannerInspiration";
import BannerSubscribe from "../../components/Banner/BannerSubscribe";
import BannerSignup from "../../components/Banner/BannerSignup";

//Landingpage
function Home() {
  return (
    <>
      <Header />
      <Container fluid className="page-wrapper">
        <Row className="d-flex flex-column justify-content-center align-items-center text-center">
          <LogotypeLightColor></LogotypeLightColor>
          <h1 className="text-center title-large">Lotus Harmony</h1>

          <p className="text-center fst-italic mb-5">
            Find Your Zen, Embrace the Harmony - Lotus Harmony, Where Your Yoga
            Journey Begins
          </p>
        </Row>
        <Row className="video-background d-flex justify-content-center">
          <video className="video" autoPlay loop muted>
            <source src={yoga} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Row>

        <ShopByCategory></ShopByCategory>

        <BannerInspiration></BannerInspiration>
        <BannerSubscribe></BannerSubscribe>
        <BannerSignup></BannerSignup>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Home;
