import { useEffect, useState } from "react";
import { Product, useProductContext } from "../../context/ProductContext";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import ProductCard from "../ProductCard/ProductCard";
import Banner from "../Banner/Banner";

// Show all products in the shop
function ProductList() {
  const { products, getAllProducts } = useProductContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const productsPerPage = 12; //Products per page

  useEffect(() => {
    getAllProducts();
  }, []);

  // Search function
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Count index for first and last product on current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container fluid style={{ padding: 0, marginTop: "7.5rem" }}>
      <Banner></Banner>
      {/* Search */}
      <Row
        style={{ marginTop: "2rem" }}
        className="d-flex justify-content-center"
      >
        <Col
          xs={10}
          sm={8}
          md={5}
          lg={3}
          className="d-flex justify-content-center mx-4"
        >
          <span
            className="input-group-text"
            style={{
              backgroundColor: "#A78295",
              borderRadius: 0,
              color: "#EFE1D1",
              fontSize: "20px",
            }}
          >
            <Search></Search>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder=" Search products..."
            className="p-2 w-100"
            style={{
              border: "2px solid lightgrey",
              color: "#3F2E3E",
              backgroundColor: "#fff",
            }}
          />
        </Col>
      </Row>

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
          { length: Math.ceil(filteredProducts.length / productsPerPage) },
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
