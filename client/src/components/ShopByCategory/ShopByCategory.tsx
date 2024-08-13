import { Button, Col, Row } from "react-bootstrap";
import { useProductContext } from "../../context/ProductContext";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./ShopByCategory.css";
import logotype from "../../assets/logotype-lotus.png";

function ShopByCategory() {
  const { categories, getAllCategories } = useProductContext();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Row className="shop-by-category-wrapper d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
      <h5 className="text-center mb-3"> Shop by category</h5>
      <Row className="category-container">
        {categories.map((category) => (
          <div className="category-box d-flex justify-content-center align-items-center">
            <NavLink
              key={category._id}
              to={`/categories/${category._id}`}
              className="menu-link d-flex flex-column"
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={logotype}
                  alt="Lotus Harmony logotype"
                  style={{ maxHeight: "4rem" }}
                />
              </div>

              <Button
                size="lg"
                style={{
                  backgroundColor: "#a78295",
                  border: "none",
                  borderRadius: 0,
                  color: "#EFE1D1",
                  flex: "display",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 500,
                }}
              >
                {category.title}
              </Button>
            </NavLink>
          </div>
        ))}
      </Row>

      <Col className="d-flex justify-content-center mt-4">
        <NavLink className="menu-link" to="/shop">
          <Button
            size="lg"
            style={{
              backgroundColor: "#85586f",
              border: "none",
              borderRadius: 0,
              color: "#EFE1D1",
              flex: "display",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 500,
            }}
          >
            Go to all products
          </Button>
        </NavLink>
      </Col>
    </Row>
  );
}

export default ShopByCategory;
