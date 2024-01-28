import { useEffect, useState } from "react";
import { Category, useProductContext } from "../../context/ProductContext";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function ProductsCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category>();

  const { products, setProducts } = useProductContext();

  useEffect(() => {
    //Get all products in a specific category
    const getProductsByCategory = async () => {
      try {
        const responseFetchProducts = await fetch(
          `/api/products/byCategory/${id}`
        );

        // Check response status
        if (!responseFetchProducts.ok) {
          const errorText = await responseFetchProducts.text();
          throw new Error(
            `Failed to fetch products. Server response: ${errorText}`
          );
        }

        const productsByCategory = await responseFetchProducts.json();
        setProducts(productsByCategory);
      } catch (err) {
        console.log(err);
      }
    };

    getProductsByCategory();
  }, [id]); // Update productlist with right content every time params for category id changes

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const apiUrl = `/api/categories/${id}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, [id]);

  return category ? (
    <>
      <Header></Header>
      <Container fluid style={{ padding: 0, marginTop: "10rem" }}>
        <Row className="d-flex flex-column align-items-center justify-content-center p-3">
          <h1
            className="mt-3"
            style={{ textAlign: "center", fontFamily: "Julius Sans One" }}
          >
            {category.title}
          </h1>
          <Col lg={8} md={8}>
            <p style={{ textAlign: "center", fontStyle: "italic" }}>
              {category.description}
            </p>
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
      <Footer />
    </>
  ) : null;
}

export default ProductsCategory;
