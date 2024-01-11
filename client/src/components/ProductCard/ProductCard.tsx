import { Product } from "../../context/ProductContext";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  return (
    <Card className="h-100">
      <Link to={`/${product._id}`} key={product._id}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="flex-grow-1" style={{ fontSize: "18px" }}>
          {product.title}
        </Card.Title>
        <Card.Text className="flex-grow-1 mb-0">{product.brand}</Card.Text>
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
  );
}

export default ProductCard;