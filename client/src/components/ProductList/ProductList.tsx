import { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import Banner from "../Banner/Banner";

// Show all products in the shop
function ProductList() {
  const { products, getAllProducts } = useProductContext();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container fluid style={{ padding: 0, marginTop: "7.5rem" }}>
      {/* <Banner></Banner> */}
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
