import { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import yoga1 from "../../assets/yoga1.jpg";
import yoga2 from "../../assets/yoga2.jpg";
import yoga3 from "../../assets/yoga3.jpg";
import border from "../../assets/border.jpg";

// Show all products in the shop
function ProductList() {
  const { products, getAllProducts } = useProductContext();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container fluid style={{ padding: 0, marginTop: "7.5rem" }}>
      <Row
        style={{
          backgroundImage: `url(${border})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          className="mt-3"
          style={{ textAlign: "center", fontFamily: "Julius Sans One" }}
        >
          Lotus Harmony
        </h1>
        <Row>
          <p style={{ textAlign: "center", fontStyle: "italic" }}>
            Find Your Zen, Embrace the Harmony - Lotus Harmony, Where Your Yoga
            Journey Begins
          </p>
        </Row>

        <Col className="d-flex justify-content-center gap-5 my-4">
          <div style={{ width: "300px", height: "300px" }}>
            <img
              className="shadow"
              src={yoga1}
              alt="Yoga"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
          <div style={{ width: "300px", height: "300px" }}>
            <img
              className="shadow"
              src={yoga2}
              alt="Yoga"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
          <div style={{ width: "300px", height: "300px" }}>
            <img
              className="shadow"
              src={yoga3}
              alt="Yoga"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "0 70%",
                borderRadius: "50%",
              }}
            />
          </div>
        </Col>
      </Row>

      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        className="d-flex justify-content-center px-4 gy-4 mt-2 flex-wrap"
      >
        {products.map((product, index) => (
          <Col key={index} className="mb-3">
            <ProductCard product={product} key={product._id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
