import { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function ProductList() {
  const { products, getAllProducts } = useProductContext();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container fluid style={{ padding: 0 }}>
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Lotus Harmony</h1>
      <Row>
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          Find Your Zen, Embrace the Harmony - Lotus Harmony, Where Your Yoga
          Journey Begins
        </p>
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
            <Card className="h-100">
              <Card.Img variant="top" src={product.image} />
              <Card.Body className="d-flex flex-column">
                <Card.Title
                  className="flex-grow-1"
                  style={{ fontSize: "18px" }}
                >
                  {product.title}
                </Card.Title>
                <Card.Text className="flex-grow-1 mb-0">
                  {product.brand}
                </Card.Text>
                <Card.Text className="d-flex justify-content-end">
                  {product.price} SEK
                </Card.Text>
                <Row className="justify-content-between">
                  <Col xs={6}>
                    <Card.Text>{product.inStock} inStock</Card.Text>
                  </Col>
                  <Col xs={6} className="d-flex justify-content-end">
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#85586f",
                        border: "none",
                        borderRadius: 0,
                        color: "#EFE1D1",
                        fontWeight: 500,
                      }}
                    >
                      Add to cart
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
