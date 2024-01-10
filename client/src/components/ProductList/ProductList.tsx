import { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Button, Card, Col, Row } from "react-bootstrap";

function ProductList() {
  const { products, getAllProducts } = useProductContext();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Row>
        <h1>Lotus Harmony</h1>
      </Row>
      <Row xs={1} md={2} lg={4} className="g-2">
        {products.map((product, index) => (
          <Col key={index}>
            <Card className="h-100" style={{ width: "22rem" }}>
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
    </>
  );
}

export default ProductList;
