import { Col, Container, Row } from "react-bootstrap";
import AdminHeader from "../../components/Header/AdminHeader";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import { useUserContext } from "../../context/UserContext";
import WelcomeAdmin from "../../components/WelcomeAdmin/WelcomeAdmin";

import NoAccess401 from "../../components/Errors/NoAccess401";

// Page for admin - managing orders and products
function Admin() {
  const { loggedInUser } = useUserContext();

  return (
    <>
      {loggedInUser?.isAdmin ? (
        <>
          <AdminHeader />
          <Container fluid className="p-0 mx-0">
            <Row>
              <Col className="col-3">
                <AdminSidebar></AdminSidebar>
              </Col>
              <Col className="col-9">
                <WelcomeAdmin />
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <NoAccess401></NoAccess401>
      )}
    </>
  );
}

export default Admin;
