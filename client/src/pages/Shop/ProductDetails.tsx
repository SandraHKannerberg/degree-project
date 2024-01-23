import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../context/ProductContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { HeartFill } from "react-bootstrap-icons";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  // Fetch details for selected product
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const apiUrl = `/api/products/${id}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Check in stock status for selected product
  function inStockStatus(inStock: number) {
    let status: string;
    let inStockValue: string;

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

  return product ? (
    <>
      <Header />
      <Container>
        <Row className="d-flex justify-content-center my-5">
          {/* Column 1 with product image */}
          <Col lg={5} className="d-flex justify-content-center mb-5">
            <img
              src={product.image}
              alt="Product image"
              className="img-fluid shadow"
            />
          </Col>
          {/* Column 2 with product details */}
          <Col lg={6}>
            <Col>
              <h2>{product.title}</h2>
            </Col>
            <Row className="d-flex flex-column">
              <Col className="d-flex justify-content-start">
                <h4>{product.brand}</h4>
              </Col>
              <Col className="d-flex justify-content-end">
                <p>
                  {inStockStatus(product.inStock)} --- {product.price} SEK
                </p>
              </Col>
            </Row>

            <Col>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#85586f",
                  border: "none",
                  borderRadius: 0,
                  color: "#EFE1D1",
                  fontWeight: 500,
                  marginBottom: "2rem",
                  width: "100%",
                }}
                className="shadow"
              >
                Add to cart
              </Button>

              <h5>Description</h5>
              <p>{product.description}</p>

              {/* If Care Advice is available for the product render this */}
              {product.careAdvice ? (
                <>
                  <h5>Care Advice</h5>
                  <p>{product.careAdvice}</p>
                </>
              ) : null}

              {/* If Features is available for the product render this */}
              {product.features ? (
                <>
                  <h5>Features</h5>
                  <ul style={{ listStyle: "none" }}>
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <span>
                          <HeartFill />
                        </span>{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </Col>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  ) : null;
}

export default ProductDetails;
