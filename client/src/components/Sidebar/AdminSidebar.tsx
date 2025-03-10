import { Nav, Row } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./Sidebar.css";

// Sidebar as a menu when logged in
function AdminSidebar() {
  const { loggedInUser } = useUserContext();
  return (
    <aside className="h-full admin-sidebar">
      {loggedInUser ? (
        <>
          <Row className="mx-1 mt-3" style={{ cursor: "pointer" }}>
            <Link to={"/loggedin"} className="menu-link">
              <h2>{loggedInUser.firstName}</h2>
            </Link>
          </Row>

          <Nav className="d-flex flex-column gap-3 mt-5">
            <Nav.Item>
              <Nav.Link className="menu-link px-3" href="/admin/orders">
                Managing Orders
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link className="menu-link px-3" href="/admin/products">
                Managing Products
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link className="menu-link px-3" href="/admin/addproduct">
                Add New Product
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </>
      ) : null}
    </aside>
  );
}

export default AdminSidebar;
