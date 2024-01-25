import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useUserContext } from "../../context/UserContext";
import WelcomeAdmin from "../../components/WelcomeAdmin/WelcomeAdmin";
import Sidebar from "../../components/Sidebar/Sidebar";

// Page for admin - managing orders and products
function Admin() {
  const { loggedInUser } = useUserContext();

  return (
    <>
      <Header />

      <Container className="h-100">
        {loggedInUser?.isAdmin === true ? (
          <Row
            className="d-flex mx-3"
            style={{ marginTop: "10rem", minHeight: "50vh" }}
          >
            <Sidebar></Sidebar>
            <Col>
              <WelcomeAdmin></WelcomeAdmin>
            </Col>
          </Row>
        ) : (
          <Row
            className="d-flex mx-3"
            style={{ marginTop: "10rem", minHeight: "50vh" }}
          >
            <p className="text-center">
              You are not authorized for this page. Please log in
            </p>
          </Row>
        )}
      </Container>

      <Footer />
    </>
  );
}

export default Admin;
