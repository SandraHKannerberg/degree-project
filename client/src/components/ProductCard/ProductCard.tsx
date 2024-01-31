import { Product } from "../../context/ProductContext";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

type ProductProps = {
  product: Product;
};

// ProductCard that render every product in the shop with shortened info on the products
function ProductCard({ product }: ProductProps) {
  // Check in stock status
  function inStockStatus(inStock: number) {
    let status: string;
    let inStockValue: string;

    // InStock indicatorn shown in the productcard
    if (inStock <= 3) {
      inStockValue = "🔴 ";
      status = "Not in stock";
    } else if (inStock < 10) {
      inStockValue = "🟡 ";
      status = "In stock";
    } else {
      inStockValue = "🟢 ";
      status = "In stock";
    }

    return `${inStockValue}${status}`;
  }

  return (
    <Card className="h-100 shadow">
      <Link to={`/product/${product._id}`} key={product._id}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title
          className="flex-grow-1"
          style={{ fontSize: "18px", textTransform: "uppercase" }}
        >
          {product.title}
        </Card.Title>
        <Card.Text className="flex-grow-1 mb-0">{product.brand}</Card.Text>
        <Card.Text className="d-flex justify-content-end">
          {product.price} SEK
        </Card.Text>
        <Row className="justify-content-between">
          <Col xs={6}>
            <Card.Text style={{ fontSize: "12px" }}>
              {inStockStatus(product.inStock)}
            </Card.Text>
          </Col>

          {/* Don't show AddToCart-button if inStock status are red. Then show a infotext */}
          {product.inStock > 3 ? (
            <Col xs={6} className="d-flex justify-content-end">
              <AddToCartBtn product={product}></AddToCartBtn>
            </Col>
          ) : (
            <span>Available soon</span>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
