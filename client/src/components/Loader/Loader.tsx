import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import { Container, Spinner } from "react-bootstrap";
import Footer from "../Footer/Footer";

function Loader() {
  return (
    <>
      <Header />
      <Menu />
      <Container
        fluid
        className="my-5"
        style={{ minHeight: "35vh", marginTop: "10rem" }}
      >
        <div
          className="text-center"
          style={{ minHeight: "35vh", marginTop: "10rem" }}
        >
          <Spinner animation="border" /> <br />
          <p>Please wait while loading...</p>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Loader;
