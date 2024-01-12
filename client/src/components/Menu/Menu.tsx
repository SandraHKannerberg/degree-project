import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useProductContext } from "../../context/ProductContext";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

//Menu with categories and link to each category
function Menu() {
  const { categories, getAllCategories } = useProductContext();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          expand={expand}
          className="mb-3"
          style={{ backgroundColor: "#DFD3C3" }}
        >
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
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
                  <NavLink to="/" className="menu-link">
                    Home
                  </NavLink>
                  <NavLink to="/shop" className="menu-link">
                    All
                  </NavLink>
                  {categories.map((category) => (
                    <NavLink
                      key={category._id}
                      to={`/categories/${category._id}`}
                      className="menu-link"
                    >
                      {category.title}
                    </NavLink>
                  ))}
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
