import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import ProductCard from "../ProductCard/ProductCard";
import Banner from "../Banner/Banner";

// Show all products in the shop
function ProductList() {
  const { products, getAllProducts } = useProductContext();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; //Products per page

  useEffect(() => {
    getAllProducts();
  }, []);

  // Count index for first and last product on current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container fluid style={{ padding: 0, marginTop: "7.5rem" }}>
      <Banner></Banner>
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        className="d-flex justify-content-center px-4 gy-4 mt-2 flex-wrap"
      >
        {currentProducts.map((product, index) => (
          <Col key={index} className="mb-3">
            <ProductCard product={product} key={product._id} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination className="justify-content-center">
        {Array.from(
          { length: Math.ceil(products.length / productsPerPage) },
          (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
              className="customize-pagination"
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </Container>
  );
}

export default ProductList;
