import { Container, Nav, Navbar } from "react-bootstrap";
import { useProductContext } from "../../context/ProductContext";
import { useEffect } from "react";

//Menu with categories and link to each category
function Menu() {
  const { categories, getAllCategories } = useProductContext();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Navbar>
      <Container className="d-flex justify-content-center">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/shop">All</Nav.Link>
          {categories.map((category, index) => (
            <Nav.Link key={index} href={`/${category._id}`}>
              {category.title}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Menu;
