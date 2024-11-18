import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useProductContext } from "../../context/ProductContext";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Component for menu. Show the categories
function Menu() {
  const { categories, getAllCategories } = useProductContext();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const categoryTexts: { [key: string]: string } = {
    "1": "Yoga Tools",
    "2": "Yoga Accessories",
    "3": "Yoga Kit",
  };

  return (
    <>
      {["md"].map((expand, index) => (
        <Navbar
          expand={expand}
          className="mb-3"
          style={{
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            background:
              "radial-gradient(circle, rgba(223,211,195,1) 0%, rgba(239,225,209,1) 100%)",
          }}
          key={index}
        >
          <Container fluid>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={() => setShowOffcanvas(!showOffcanvas)}
            />
            <Navbar.Offcanvas
              show={showOffcanvas}
              onHide={handleCloseOffcanvas}
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-flex justify-content-center">
                <Nav className="gap-md-3 gap-lg-4 gap-xl-5">
                  <NavLink
                    to="/"
                    className="menu-link"
                    onClick={handleCloseOffcanvas}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/shop"
                    className="menu-link"
                    onClick={handleCloseOffcanvas}
                  >
                    Shop
                  </NavLink>
                  {/* {categories.map((category) => (
                    <NavLink
                      key={category._id}
                      to={`/categories/${category._id}`}
                      className="menu-link"
                      onClick={handleCloseOffcanvas}
                    >
                      {category.title} || categoryTexts
                    </NavLink>
                  ))} */}

                  {categories.map((category) => {
                    const categoryId = category._id.toString();
                    const linkText =
                      categoryTexts[categoryId] || category.title;

                    return (
                      <NavLink
                        key={categoryId}
                        to={`/categories/${categoryId}`}
                        className="menu-link"
                        onClick={handleCloseOffcanvas}
                      >
                        {linkText}
                      </NavLink>
                    );
                  })}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Menu;
