import Header from "../../components/Header/Header";
import LogotypeLightColor from "../../components/Logotype/LogotypeLightColor";
import yoga from "../../assets/yoga.mp4";
import { Container, Row } from "react-bootstrap";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import ShopByCategory from "../../components/ShopByCategory/ShopByCategory";
import BannerInspiration from "../../components/Banner/BannerInspiration";
import BannerSubscribe from "../../components/Banner/BannerSubscribe";
import BannerMember from "../../components/Banner/BannerMember";

//Landingpage
function Home() {
  return (
    <>
      <Header />
      <Container
        fluid
        style={{
          padding: 0,
          marginTop: "10rem",
        }}
      >
        <Row
          style={{
            flex: "display",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <LogotypeLightColor></LogotypeLightColor>
          <h1 style={{ textAlign: "center", fontFamily: "Julius Sans One" }}>
            Lotus Harmony
          </h1>

          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              marginBottom: "3rem",
            }}
          >
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
        <BannerMember></BannerMember>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Home;
