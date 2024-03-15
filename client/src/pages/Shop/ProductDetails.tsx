import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../context/ProductContext";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { HeartFill } from "react-bootstrap-icons";
import AddToCartBtn from "../../components/AddToCartBtn/AddToCartBtn";

// Page to show a single product with all information about it
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  // Fetch details for selected product
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const apiUrl = `/api/products/${id}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          // Handle non-successful response
          throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Check in stock status for selected product
  function inStockStatus(inStock: number) {
    let status: string;
    let inStockValue: string;

    //Show inStock indicator
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
    <>
      <Header />
      <>
        {!product ? (
          <Container style={{ marginTop: "10rem", minHeight: "55vh" }}>
            <h2 className="text-center">Can't find this product</h2>
          </Container>
        ) : (
          <Container style={{ marginTop: "10rem" }}>
            <Row className="d-flex justify-content-center my-5">
              {/* Column 1 with product image */}
              <Col sm={8} lg={4} className="d-flex justify-content-center mb-5">
                <img
                  src={product.image}
                  alt="Product image"
                  className="img-fluid shadow"
                  style={{ objectFit: 'cover', width: '100%', height: '100%', aspectRatio: '1 / 1' }} 
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
                      {inStockStatus(product.inStock)} ---{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {product.price} SEK
                      </span>
                    </p>
                  </Col>
                </Row>

                <Col>
                  <Row className="justify-content-end">
                    {/* Don't show AddToCart-button if inStock status are red. Then show a infotext */}
                    {product.inStock > 3 ? (
                      <Col xs={6} className="d-flex justify-content-end">
                        <AddToCartBtn product={product}></AddToCartBtn>
                      </Col>
                    ) : (
                      <span>Available soon</span>
                    )}
                  </Row>

                  <h5 className="mt-4">Description</h5>
                  <p>{product.description}</p>

                  {/* If Care Advice is available for the product render this */}
                  {product.careAdvice ? (
                    <>
                      <h5 className="mt-5">Care Advice</h5>
                      <p>{product.careAdvice}</p>
                    </>
                  ) : null}

                  {/* If Features is available for the product render this */}
                  {product.features ? (
                    <>
                      <h5 className="mt-5">Features</h5>
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
        )}
        <Footer />
      </>
    </>
  );
}

export default ProductDetails;
