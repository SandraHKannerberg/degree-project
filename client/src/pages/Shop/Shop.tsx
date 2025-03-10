import { Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ProductList from "../../components/ProductList/ProductList";

// Showing all products
function Shop() {
  return (
    <>
      <Header />
      <Container fluid className="page-wrapper">
        <main>
          <Row className="text-center d-flex flex-col justify-content-center align-items-center w-100">
            <h1 className="title-font">Lotus Harmony</h1>

            <p className="slogan font-italic">
              Find Your Zen, Embrace the Harmony - Lotus Harmony, Where Your
              Yoga Journey Begins
            </p>
          </Row>
          <ProductList />
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default Shop;
